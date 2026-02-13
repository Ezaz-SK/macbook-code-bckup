import os
import numpy as np
import pandas as pd
import yfinance as yf

# ===============================
# 0. CONFIG
# ===============================
SYMBOL = "TCS.NS"
START_DATE = "2018-01-01"

BASE_DIR = os.getcwd()
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PRICE_FILE = os.path.join(OUTPUT_DIR, "price_data.csv")

# ===============================
# 1. LOAD PRICE DATA
# ===============================
def load_price_data():
    df = yf.download(
        SYMBOL,
        start=START_DATE,
        auto_adjust=True,
        progress=False
    )

    if df is None or df.empty:
        raise RuntimeError("Price data download failed")

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    df = df[["Close"]].copy()
    df.rename(columns={"Close": "close"}, inplace=True)
    df.dropna(inplace=True)

    return df

# ===============================
# 2. FEATURE ENGINEERING
# ===============================
def add_features(df):
    df["return"] = df["close"].pct_change()
    df["sma_20"] = df["close"].rolling(20).mean()
    df["sma_50"] = df["close"].rolling(50).mean()
    df["volatility"] = df["return"].rolling(20).std()

    df.dropna(inplace=True)
    return df

# ===============================
# 3. PRICE SIGNAL LOGIC (ROBUST)
# ===============================
def generate_price_signal(df):
    """
    Logic:
    BUY  → price above SMA20 & SMA50, low volatility
    HOLD → mixed conditions
    SELL → price below SMA20 & SMA50
    """

    conditions_buy = (
        (df["close"] > df["sma_20"]) &
        (df["sma_20"] > df["sma_50"])
    )

    conditions_sell = (
        (df["close"] < df["sma_20"]) &
        (df["sma_20"] < df["sma_50"])
    )

    df["price_signal"] = "HOLD"
    df.loc[conditions_buy, "price_signal"] = "BUY"
    df.loc[conditions_sell, "price_signal"] = "SELL"

    return df

# ===============================
# 4. SAVE OUTPUT FOR FUSION MODEL
# ===============================
def save_price_output(df):
    output = df[["close", "price_signal"]].copy()
    output["date"] = output.index

    output = output[["date", "close", "price_signal"]]
    output.to_csv(PRICE_FILE, index=False)

    print("✅ price_data.csv saved")
    print(f"📄 Path: {PRICE_FILE}")

# ===============================
# 5. MAIN PIPELINE
# ===============================
def run():
    print("📈 Running price model for sentiment fusion...")

    df = load_price_data()
    df = add_features(df)
    df = generate_price_signal(df)

    save_price_output(df)

    print("✅ Price model complete")

if __name__ == "__main__":
    run()
