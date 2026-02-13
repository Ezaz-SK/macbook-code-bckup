import os
import pandas as pd
import numpy as np
import plotly.graph_objects as go

# ===============================
# 0. PATHS
# ===============================
BASE_DIR = os.getcwd()

NEWS_DIR = os.path.join(BASE_DIR, "news_engine", "data", "csv")
PRICE_FILE = os.path.join(BASE_DIR, "outputs", "price_data.csv")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ===============================
# 1. LOAD NEWS DATA
# ===============================
def load_news():
    files = [
        os.path.join(NEWS_DIR, f)
        for f in os.listdir(NEWS_DIR)
        if f.startswith("tcs_news_") and f.endswith(".csv")
    ]

    if not files:
        raise RuntimeError("❌ No news CSVs found")

    df_list = [pd.read_csv(f) for f in files]
    news = pd.concat(df_list, ignore_index=True)

    news["date"] = pd.to_datetime(news["published_at"]).dt.date

    # Safety check
    if "behavioural_score" not in news.columns:
        raise RuntimeError("❌ behavioural_score missing in news data")

    return news

# ===============================
# 2. AGGREGATE NEWS (PER DAY)
# ===============================
def aggregate_news(news):
    daily_news = (
        news.groupby("date", as_index=False)["behavioural_score"]
        .mean()
    )

    daily_news["news_bias"] = np.where(
        daily_news["behavioural_score"] > 0.2, "BULLISH",
        np.where(daily_news["behavioural_score"] < -0.2, "BEARISH", "NEUTRAL")
    )

    return daily_news

# ===============================
# 3. LOAD PRICE MODEL DATA
# ===============================
def load_price_data():
    if not os.path.exists(PRICE_FILE):
        raise RuntimeError("❌ price_data.csv not found. Run model_sentiment.py first.")

    price = pd.read_csv(PRICE_FILE, parse_dates=["date"])
    price["date"] = price["date"].dt.date

    required_cols = {"date", "close", "price_signal"}
    if not required_cols.issubset(price.columns):
        raise RuntimeError(f"❌ price_data.csv missing columns: {required_cols}")

    return price

# ===============================
# 4. MERGE NEWS + PRICE
# ===============================
def merge_data(price, news):
    merged = price.merge(news, on="date", how="left")

    merged["behavioural_score"] = merged["behavioural_score"].fillna(0.0)
    merged["news_bias"] = merged["news_bias"].fillna("NEUTRAL")

    return merged

# ===============================
# 5. FINAL DECISION ENGINE
# ===============================
def final_decision(row):
    price_signal = row["price_signal"]
    news_score = row["behavioural_score"]

    if price_signal == "BUY" and news_score > 0.3:
        return "BUY (HIGH CONFIDENCE)"
    if price_signal == "BUY" and news_score < -0.3:
        return "AVOID (NEGATIVE NEWS)"
    if price_signal == "HOLD" and news_score > 0.4:
        return "WATCH FOR BREAKOUT"

    return price_signal

# ===============================
# 6. APPLY DECISIONS
# ===============================
def apply_decisions(df):
    df["final_decision"] = df.apply(final_decision, axis=1)
    return df

# ===============================
# 7. INTERACTIVE PLOT (PLOTLY)
# ===============================
def plot_dashboard(df):
    fig = go.Figure()

    fig.add_trace(go.Scatter(
        x=df["date"],
        y=df["close"],
        mode="lines",
        name="Price"
    ))

    fig.add_trace(go.Scatter(
        x=df["date"],
        y=df["behavioural_score"],
        mode="lines",
        name="Behavioural Score",
        yaxis="y2"
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

    fig.write_html(os.path.join(OUTPUT_DIR, "news_vs_price.html"))
    fig.show()

# ===============================
# 8. MAIN PIPELINE
# ===============================
def run():
    print("🔗 Loading data...")

    news = load_news()
    daily_news = aggregate_news(news)

    price = load_price_data()
    merged = merge_data(price, daily_news)

    merged = apply_decisions(merged)

    # 🔴 EXPLICIT OUTPUT COLUMNS (FIX)
    final_cols = [
        "date",
        "close",
        "price_signal",
        "behavioural_score",
        "news_bias",
        "final_decision"
    ]

    merged[final_cols].to_csv(
        os.path.join(OUTPUT_DIR, "final_decisions.csv"),
        index=False
    )

    plot_dashboard(merged)

    print("✅ Fusion model complete")
    print("📄 final_decisions.csv saved")
    print("📊 news_vs_price.html generated")

if __name__ == "__main__":
    run()
