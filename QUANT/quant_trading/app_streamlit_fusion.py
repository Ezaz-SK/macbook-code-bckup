import os
import pandas as pd
import numpy as np
import streamlit as st
import plotly.graph_objects as go
import plotly.express as px

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
DECISIONS_FILE = os.path.join(BASE_DIR, "outputs", "final_decisions.csv")

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
        st.error("❌ No news CSVs found. Run news_collector.py first.")
        st.stop()

    df = pd.concat([pd.read_csv(f) for f in files], ignore_index=True)
    df["date"] = pd.to_datetime(df["published_at"]).dt.date
    return df


@st.cache_data
def aggregate_news(news):
    daily = (
        news.groupby("date")
        .apply(lambda x: np.average(
            x["behavioural_score"],
            weights=np.abs(x["behavioural_score"]) + 0.1
        ))
        .reset_index(name="behavioural_score")
    )

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


@st.cache_data
def load_decisions():
    if not os.path.exists(DECISIONS_FILE):
        return pd.DataFrame()

    df = pd.read_csv(DECISIONS_FILE, parse_dates=["date"]) if os.path.exists(DECISIONS_FILE) else pd.DataFrame()
    if not df.empty:
        df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)
    return df


# ===============================
# MERGE LOGIC (NEWS LEADS PRICE)
# ===============================
def merge_data(price, news):
    price = price.copy()
    news = news.copy()

    price["date"] = pd.to_datetime(price["date"]).dt.tz_localize(None)
    news["date"] = pd.to_datetime(news["date"]).dt.tz_localize(None)

    price = price.sort_values("date")
    news = news.sort_values("date")

    merged = pd.merge_asof(
        price,
        news,
        on="date",
        direction="backward"
    )

    merged["behavioural_score"] = merged["behavioural_score"].fillna(0.0)
    merged["news_bias"] = merged["news_bias"].fillna("NEUTRAL")

    merged["daily_return"] = merged["close"].pct_change()

    return merged


# ===============================
# LOAD & PROCESS
# ===============================
news_raw = load_news()
news_daily = aggregate_news(news_raw)
price = load_price()
df = merge_data(price, news_daily)

# ===============================
# SIDEBAR FILTERS
# ===============================
st.sidebar.header("🔎 Filters")

start_date = st.sidebar.date_input("Start date", df["date"].min().date())
end_date = st.sidebar.date_input("End date", df["date"].max().date())

df = df[(df["date"] >= pd.to_datetime(start_date)) &
        (df["date"] <= pd.to_datetime(end_date))]

news_raw = news_raw[
    (news_raw["date"] >= start_date) &
    (news_raw["date"] <= end_date)
]

# Filter final decisions by the same date range
decisions = load_decisions()
if not decisions.empty:
    decisions = decisions[
        (decisions["date"] >= pd.to_datetime(start_date)) &
        (decisions["date"] <= pd.to_datetime(end_date))
    ]

# ===============================
# KEY METRICS
# ===============================
c1, c2, c3 = st.columns(3)

c1.metric("Avg Behavioural Score", round(df["behavioural_score"].mean(), 3))
c2.metric("Bullish Days", int((df["news_bias"] == "BULLISH").sum()))
c3.metric("News Articles", len(news_raw))

# ===============================
# TABS
# ===============================
tab_home, tab_price, tab_sentiment, tab_news, tab_corr, tab_decisions = st.tabs([
    "🏠 Home",
    "📈 Price & Sentiment",
    "🧠 Sentiment Analytics",
    "📰 News Analysis",
    "📊 Correlations",
    "📋 Final Decisions"
])

# ===============================
# TAB: HOME / MASTER VIEW
# ===============================
with tab_home:
    st.markdown("# Home — Master View")

    # Top: full-width Price vs Behavioural Score
    with st.container():
        st.markdown("**Price vs Behavioural Score**")
        fig_home = go.Figure()
        fig_home.add_trace(go.Scatter(x=df["date"], y=df["close"], name="Price", line=dict(color="royalblue")))
        fig_home.add_trace(go.Scatter(x=df["date"], y=df["behavioural_score"], name="Behavioural Score", yaxis="y2", line=dict(color="orange")))
        fig_home.update_layout(
            template="plotly_dark",
            title="",
            yaxis=dict(title="Price"),
            yaxis2=dict(title="Behavioural Score", overlaying="y", side="right"),
            hovermode="x unified",
            height=360,
            margin=dict(t=10, b=10)
        )
        st.plotly_chart(fig_home, use_container_width=True)

    st.markdown("---")

    # Cards row: Sentiment / News / Correlations
    col_s, col_n, col_c = st.columns([1, 1, 1], gap="large")

    # Sentiment Analytics card
    with col_s:
        st.markdown("### 🧠 Sentiment Analytics")
        df_sent = df.copy()
        df_sent["sent_ma_7"] = df_sent["behavioural_score"].rolling(7).mean()
        df_sent["sent_ma_30"] = df_sent["behavioural_score"].rolling(30).mean()

        fig_sent = go.Figure()
        fig_sent.add_trace(go.Scatter(x=df_sent["date"], y=df_sent["behavioural_score"], name="Daily", line=dict(color="#FF7F0E")))
        fig_sent.add_trace(go.Scatter(x=df_sent["date"], y=df_sent["sent_ma_7"], name="7D MA", line=dict(color="#1F77B4")))
        fig_sent.add_trace(go.Scatter(x=df_sent["date"], y=df_sent["sent_ma_30"], name="30D MA", line=dict(color="#2CA02C")))
        fig_sent.update_layout(template="plotly_dark", height=260, margin=dict(t=10, b=10), legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1))
        st.plotly_chart(fig_sent, use_container_width=True)

        sent_dist = news_raw["sentiment_label"].value_counts()
        if not sent_dist.empty:
            fig_pd = px.pie(names=sent_dist.index, values=sent_dist.values, hole=0.45)
            fig_pd.update_layout(template="plotly_dark", height=220, margin=dict(t=0, b=10))
            st.plotly_chart(fig_pd, use_container_width=True)

    # News Analysis card
    with col_n:
        st.markdown("### 📰 News Analysis")
        if not news_raw.empty:
            source_impact = news_raw.groupby("source")["behavioural_score"].mean().sort_values().tail(8)
            fig_src = px.bar(source_impact, orientation="h")
            fig_src.update_layout(template="plotly_dark", height=260, margin=dict(t=10, b=10), yaxis=dict(title="source"), xaxis=dict(title="avg score"))
            st.plotly_chart(fig_src, use_container_width=True)

            volume = news_raw.groupby("date").size().reset_index(name="articles")
            fig_vol = px.bar(volume, x="date", y="articles")
            fig_vol.update_layout(template="plotly_dark", height=220, margin=dict(t=0, b=10), xaxis=dict(title="date"), yaxis=dict(title="articles"))
            st.plotly_chart(fig_vol, use_container_width=True)
        else:
            st.info("No news data available for the selected dates.")

    # Correlations card
    with col_c:
        st.markdown("### 📊 Correlations")
        if len(df) > 1:
            corr_val = df[["behavioural_score", "daily_return"]].corr().iloc[0, 1]
            st.metric("Sentiment–Return Correlation", value=round(corr_val, 3))

            fig_corr = px.scatter(df, x="behavioural_score", y="daily_return", trendline="ols")
            fig_corr.update_layout(template="plotly_dark", height=500, margin=dict(t=10), xaxis=dict(title="behavioural_score"), yaxis=dict(title="daily_return"))
            st.plotly_chart(fig_corr, use_container_width=True)
        else:
            st.info("Not enough data to compute correlations.")

    st.markdown("---")

    # Filtered Final Decisions preview
    st.markdown("### 📋 Final Decisions (filtered)")
    if decisions.empty:
        st.info("No final decisions for selected dates.")
    else:
        st.dataframe(decisions, use_container_width=True)

    # Small news sample
    st.markdown("### 📰 News Sample")
    st.dataframe(news_raw.head(50), use_container_width=True)

# ===============================
# TAB: PRICE + SENTIMENT
# ===============================
with tab_price:
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
        title="Price vs Behavioural Score",
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
# TAB: SENTIMENT TRENDS
# ===============================
with tab_sentiment:
    df["sent_ma_7"] = df["behavioural_score"].rolling(7).mean()
    df["sent_ma_30"] = df["behavioural_score"].rolling(30).mean()

    fig = go.Figure()

    fig.add_trace(go.Scatter(x=df["date"], y=df["behavioural_score"],
                             name="Daily Sentiment"))
    fig.add_trace(go.Scatter(x=df["date"], y=df["sent_ma_7"],
                             name="7D MA"))
    fig.add_trace(go.Scatter(x=df["date"], y=df["sent_ma_30"],
                             name="30D MA"))

    fig.update_layout(title="Sentiment Trend Analysis",
                      hovermode="x unified")

    st.plotly_chart(fig, use_container_width=True)

# ===============================
# TAB: NEWS ANALYSIS
# ===============================
with tab_news:
    col1, col2 = st.columns(2)

    with col1:
        sentiment_dist = news_raw["sentiment_label"].value_counts()
        fig = px.pie(
            names=sentiment_dist.index,
            values=sentiment_dist.values,
            hole=0.4,
            title="Sentiment Distribution"
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        source_impact = (
            news_raw.groupby("source")["behavioural_score"]
            .mean()
            .sort_values()
            .tail(10)
        )

        fig = px.bar(
            source_impact,
            orientation="h",
            title="Top News Sources Impact"
        )
        st.plotly_chart(fig, use_container_width=True)

    volume = news_raw.groupby("date").size().reset_index(name="articles")
    fig = px.bar(volume, x="date", y="articles",
                 title="Daily News Volume")
    st.plotly_chart(fig, use_container_width=True)

# ===============================
# TAB: CORRELATION ANALYSIS
# ===============================
with tab_corr:
    corr = df[["behavioural_score", "daily_return"]].corr().iloc[0, 1]

    st.metric("Sentiment–Return Correlation", round(corr, 3))

    fig = px.scatter(
        df,
        x="behavioural_score",
        y="daily_return",
        trendline="ols",
        title="Sentiment vs Daily Returns"
    )

    st.plotly_chart(fig, use_container_width=True)

# ===============================
# TAB: FINAL DECISIONS TABLE
# ===============================
with tab_decisions:
    if decisions.empty:
        st.info("No final decisions found at outputs/final_decisions.csv for the selected dates")
    else:
        st.subheader("Final Decisions")
        st.dataframe(decisions, use_container_width=True)

# ===============================
# FOOTER
# ===============================
st.markdown("---")
st.caption("News–Price Fusion Analytics | Research Dashboard")
