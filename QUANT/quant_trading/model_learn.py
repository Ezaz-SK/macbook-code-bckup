import os
import numpy as np
import pandas as pd
import yfinance as yf
import ta
import matplotlib.pyplot as plt
import plotly.graph_objects as go

from xgboost import XGBClassifier

# ===============================
# 0. CONFIG
# ===============================
BASE_DIR = os.getcwd()
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

STOCKS = [
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
]

START_DATE = "2018-01-01"
STOP_LOSS = 0.02
TAKE_PROFIT = 0.04

FEATURES = ['return', 'sma_10', 'sma_20', 'rsi', 'volatility']

# ===============================
# 1. DATA DOWNLOAD & CACHE
# ===============================
def get_stock_data(symbol):
    """
    Downloads NSE data once and caches it in /data folder.
    Reuses local CSV if available.
    """
    file_path = os.path.join(DATA_DIR, f"{symbol}.csv")

    if os.path.exists(file_path):
        df = pd.read_csv(file_path, index_col=0, parse_dates=True)
        return df

    print(f"Downloading data for {symbol}...")
    df = yf.download(
        symbol,
        start=START_DATE,
        auto_adjust=True,
        progress=False,
        threads=False
    )

    if df is None or df.empty:
        return None

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    df['Close'] = pd.to_numeric(df['Close'], errors='coerce')
    df.dropna(inplace=True)

    df.to_csv(file_path)
    return df

# ===============================
# 2. FEATURE ENGINEERING
# ===============================
def add_features(df):
    df = df.copy()

    df['return'] = df['Close'].pct_change()
    df['sma_10'] = df['Close'].rolling(10).mean()
    df['sma_20'] = df['Close'].rolling(20).mean()
    df['rsi'] = ta.momentum.RSIIndicator(df['Close']).rsi()
    df['volatility'] = df['return'].rolling(20).std()

    df['target'] = (df['Close'].shift(-1) > df['Close']).astype(int)

    df.dropna(inplace=True)
    return df

# ===============================
# 3. WALK-FORWARD PREDICTION
# ===============================
def walk_forward_predictions(df, window=500):
    preds = pd.Series(index=df.index, dtype=float)

    for i in range(window, len(df)):
        train = df.iloc[i-window:i]
        test = df.iloc[i:i+1]

        model = XGBClassifier(
            n_estimators=100,
            max_depth=3,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            eval_metric="logloss"
        )

        model.fit(train[FEATURES], train['target'])
        preds.iloc[i] = model.predict(test[FEATURES])[0]

    return preds

# ===============================
# 4. STRATEGY & RISK ENGINE
# ===============================
def apply_strategy(df):
    df = df.copy()

    df['trend'] = (df['Close'] > df['sma_20']).astype(int)
    df['signal'] = df['prediction'] * df['trend']
    df['strategy_return'] = 0.0

    for i in range(1, len(df)):
        if df['signal'].iloc[i-1] == 1:
            ret = df['return'].iloc[i]

            if ret <= -STOP_LOSS:
                ret = -STOP_LOSS
            elif ret >= TAKE_PROFIT:
                ret = TAKE_PROFIT

            df.iloc[i, df.columns.get_loc('strategy_return')] = ret

    return df

# ===============================
# 5. MAIN PORTFOLIO LOOP
# ===============================
portfolio_equity = pd.DataFrame()
signals_log = []

for symbol in STOCKS:
    print(f"Processing {symbol}")

    df = get_stock_data(symbol)
    if df is None or len(df) < 600:
        continue

    df = add_features(df)
    df['prediction'] = walk_forward_predictions(df)
    df.dropna(inplace=True)

    df = apply_strategy(df)
    df['equity'] = (1 + df['strategy_return']).cumprod()

    portfolio_equity[symbol] = df['equity']

    for date, row in df.iterrows():
        if row['signal'] == 1:
            signals_log.append({
                "date": date,
                "symbol": symbol,
                "signal": "BUY"
            })

# ===============================
# 6. PORTFOLIO AGGREGATION (FIXED)
# ===============================
portfolio_equity = portfolio_equity.ffill()
portfolio_equity['portfolio'] = portfolio_equity.mean(axis=1)

# ===============================
# 7. SAVE OUTPUTS
# ===============================
pd.DataFrame(signals_log).to_csv(
    os.path.join(OUTPUT_DIR, "signals.csv"),
    index=False
)


fig = go.Figure()

fig.add_trace(go.Scatter(
    x=portfolio_equity.index,
    y=portfolio_equity['portfolio'],
    mode='lines',
    name='Portfolio Equity'
))

fig.update_layout(
    title="NSE Multi-Stock Walk-Forward Portfolio",
    xaxis_title="Date",
    yaxis_title="Equity (Normalized)",
    hovermode="x unified"
)

fig.write_html("outputs/equity_curve.html")
fig.show()


print("✅ Model run complete")
print("📄 Signals saved to outputs/signals.csv")
