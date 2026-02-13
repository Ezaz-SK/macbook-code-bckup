import os
import pandas as pd
import numpy as np
import streamlit as st
import plotly.graph_objects as go

# ===============================
# STREAMLIT CONFIG
# ===============================
st.set_page_config(
    page_title="News + Price Fusion Dashboard",
    layout="wide"
)

st.title("📊 NSE News–Price Fusion Dashboard (TCS)")

# ===============================
# PATHS
# ===============================
BASE_DIR = os.getcwd()
NEWS_DIR = os.path.join(BASE_DIR, "news_engine", "data", "csv")
PRICE_FILE = os.path.join(BASE_DIR, "outputs", "price_data.csv")

# ===============================
# DATA LOADERS
# ===============================
@st.cache_data
def load_news():
    files = [
        os.path.join(NEWS_DIR, f)
        for f in os.listdir(NEWS_DIR)
        if f.startswith("tcs_news_") and f.endswith(".csv")
    ]

    if not files:
        st.error("❌ No news CSV files found. Run news_collector.py first.")
        st.stop()

    df = pd.concat([pd.read_csv(f) for f in files], ignore_index=True)

    # 🔥 FIX 1: GROUP BY CALENDAR DAY (NOT TIMESTAMP)
    df["date"] = pd.to_datetime(df["published_at"]).dt.date

    return df


@st.cache_data
def aggregate_news(news):
    """
    Weighted daily behavioural score:
    - Strong news dominates
    - Weak filler news does not dilute signal
    """

    daily = (
        news.groupby("date")
        .apply(lambda x: np.average(
            x["behavioural_score"],
            weights=np.abs(x["behavioural_score"]) + 0.1
        ))
        .reset_index(name="behavioural_score")
    )

    # 🔥 FIX 2: REALISTIC THRESHOLDS
    daily["news_bias"] = np.where(
        daily["behavioural_score"] > 0.1, "BULLISH",
        np.where(daily["behavioural_score"] < -0.1, "BEARISH", "NEUTRAL")
    )

    return daily


@st.cache_data
def load_price():
    if not os.path.exists(PRICE_FILE):
        st.error("❌ price_data.csv not found. Run model_sentiment.py first.")
        st.stop()

    price = pd.read_csv(PRICE_FILE, parse_dates=["date"])
    return price


# ===============================
# MERGE LOGIC (NEWS LEADS PRICE)
# ===============================
def merge_data(price, news):
    price = price.copy()
    news = news.copy()

    # Normalize dates
    price["date"] = pd.to_datetime(price["date"]).dt.tz_localize(None)
    news["date"] = pd.to_datetime(news["date"]).dt.tz_localize(None)

    price = price.sort_values("date")
    news = news.sort_values("date")

    # 🔥 FIX 3: USE LAST KNOWN NEWS (REAL MARKET LOGIC)
    merged = pd.merge_asof(
        price,
        news,
        on="date",
        direction="backward"
    )

    merged["behavioural_score"] = merged["behavioural_score"].fillna(0.0)
    merged["news_bias"] = merged["news_bias"].fillna("NEUTRAL")

    return merged


# ===============================
# DECISION ENGINE
# ===============================
def final_decision(row):
    if row["price_signal"] == "BUY" and row["behavioural_score"] > 0.25:
        return "BUY (HIGH CONFIDENCE)"

    if row["price_signal"] == "BUY" and row["behavioural_score"] < -0.25:
        return "AVOID (NEGATIVE NEWS)"

    if row["price_signal"] == "HOLD" and row["behavioural_score"] > 0.35:
        return "WATCH FOR BREAKOUT"

    return row["price_signal"]


# ===============================
# LOAD & PROCESS
# ===============================
news_raw = load_news()
news_daily = aggregate_news(news_raw)
price = load_price()
df = merge_data(price, news_daily)

df["final_decision"] = df.apply(final_decision, axis=1)

# ===============================
# SIDEBAR FILTERS
# ===============================
st.sidebar.header("🔎 Filters")

start_date = st.sidebar.date_input(
    "Start date",
    df["date"].min().date()
)

end_date = st.sidebar.date_input(
    "End date",
    df["date"].max().date()
)

df = df[
    (df["date"] >= pd.to_datetime(start_date)) &
    (df["date"] <= pd.to_datetime(end_date))
]

# ===============================
# KEY METRICS
# ===============================
col1, col2, col3 = st.columns(3)

col1.metric(
    "Avg Behavioural Score",
    round(df["behavioural_score"].mean(), 3)
)

col2.metric(
    "Bullish Days",
    int((df["news_bias"] == "BULLISH").sum())
)

col3.metric(
    "High Confidence BUY",
    int((df["final_decision"] == "BUY (HIGH CONFIDENCE)").sum())
)

# ===============================
# PRICE + NEWS PLOT
# ===============================
fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df["date"],
    y=df["close"],
    name="Price",
    line=dict(color="royalblue")
))

fig.add_trace(go.Scatter(
    x=df["date"],
    y=df["behavioural_score"],
    name="Behavioural Score",
    yaxis="y2",
    line=dict(color="orange")
))

fig.update_layout(
    title="TCS Price vs News Behavioural Score",
    xaxis_title="Date",
    yaxis=dict(title="Price"),
    yaxis2=dict(
        title="Behavioural Score",
        overlaying="y",
        side="right"
    ),
    hovermode="x unified"
)

st.plotly_chart(fig, use_container_width=True)

# ===============================
# DECISION TABLE
# ===============================
st.subheader("📄 Final Decisions Table")

st.dataframe(
    df[[
        "date",
        "close",
        "price_signal",
        "behavioural_score",
        "news_bias",
        "final_decision"
    ]].sort_values("date", ascending=False),
    use_container_width=True
)

# ===============================
# FOOTER
# ===============================
st.markdown("---")
st.caption("Built using NewsAPI + NSE price data | Educational use only")
