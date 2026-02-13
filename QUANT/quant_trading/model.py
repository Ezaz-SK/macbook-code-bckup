import numpy as np
import pandas as pd
import yfinance as yf
import ta
import matplotlib.pyplot as plt
import os

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# ===============================
# 0. SETUP
# ===============================
os.makedirs("outputs", exist_ok=True)

# ===============================
# 1. DATA (INDIAN STOCK - NSE)
# ===============================
symbol = "TCS.NS"  # try INFY.NS, HDFCBANK.NS, ICICIBANK.NS

data = yf.download(
    symbol,
    start="2018-01-01",
    auto_adjust=True,
    progress=False,
    threads=False
)

if data is None or data.empty:
    raise RuntimeError(f"NSE data download failed for {symbol}")

# Flatten columns (VERY IMPORTANT)
if isinstance(data.columns, pd.MultiIndex):
    data.columns = data.columns.get_level_values(0)

data = data.copy()

# ===============================
# 2. CLEANING
# ===============================
data['Close'] = pd.to_numeric(data['Close'], errors='coerce')
data.dropna(inplace=True)

# ===============================
# 3. FEATURE ENGINEERING
# ===============================
data['return'] = data['Close'].pct_change()
data['sma_10'] = data['Close'].rolling(10).mean()
data['sma_20'] = data['Close'].rolling(20).mean()

# RSI (must be Series)
data['rsi'] = ta.momentum.RSIIndicator(
    close=data['Close']
).rsi()

data['volatility'] = data['return'].rolling(20).std()

# Target: next-day direction
data['target'] = (data['Close'].shift(-1) > data['Close']).astype(int)

data.dropna(inplace=True)

if len(data) < 300:
    raise RuntimeError("Not enough NSE data")

features = ['return', 'sma_10', 'sma_20', 'rsi', 'volatility']
X = data[features]
y = data['target']

# ===============================
# 4. MODEL
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, shuffle=False, test_size=0.2
)

model = XGBClassifier(
    n_estimators=150,
    max_depth=3,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

preds = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, preds))

# ===============================
# 5. BACKTEST (TREND FILTER)
# ===============================
data['prediction'] = model.predict(X)

# ✅ SAFE trend filter (NO broadcasting)
data['trend'] = (data['Close'] > data['sma_20']).astype(int)

data['strategy_return'] = data['prediction'] * data['trend'] * data['return']
data['market_return'] = data['return']

data['cum_strategy'] = (1 + data['strategy_return']).cumprod()
data['cum_market'] = (1 + data['market_return']).cumprod()

# ===============================
# 6. RISK METRIC
# ===============================
def max_drawdown(series):
    peak = series.cummax()
    return ((series - peak) / peak).min()

print("Max Drawdown:", max_drawdown(data['cum_strategy']))

# ===============================
# 7. POSITION SIZING
# ===============================
capital = 100000  # ₹
risk_per_trade = 0.01

data['position_size'] = risk_per_trade / (data['volatility'] * 100)
data['position_size'] = data['position_size'].clip(0, 1)

# ===============================
# 8. PAPER TRADING
# ===============================
data['paper_return'] = data['position_size'] * data['strategy_return']
data['paper_equity'] = (1 + data['paper_return']).cumprod() * capital

# ===============================
# 9. PLOTS
# ===============================
plt.figure(figsize=(12,6))
plt.plot(data['cum_strategy'], label='ML Strategy')
plt.plot(data['cum_market'], label='Market')
plt.legend()
plt.title(f"NSE Strategy vs Market ({symbol})")
plt.savefig("outputs/nse_backtest.png", dpi=300)
plt.show()

plt.figure(figsize=(12,6))
plt.plot(data['paper_equity'], label='Paper Equity')
plt.legend()
plt.title(f"NSE Paper Trading Curve ({symbol})")
plt.savefig("outputs/nse_paper_equity.png", dpi=300)
plt.show()
