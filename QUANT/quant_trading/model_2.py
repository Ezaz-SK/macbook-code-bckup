import os
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px

# ===============================
# 0. CONFIG
# ===============================
BASE_DIR = os.getcwd()
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(OUTPUT_DIR, exist_ok=True)

STOCKS = ["TCS.NS", "INFY.NS", "HDFCBANK.NS"]
START_CAPITAL = 100000

# ===============================
# 1. LOAD DATA (CSV ONLY)
# ===============================
def load_csv(symbol):
    df = pd.read_csv(
        os.path.join(DATA_DIR, f"{symbol}.csv"),
        index_col=0,
        parse_dates=True
    )
    df = df.sort_index()
    df['return'] = df['Close'].pct_change()
    return df.dropna()

data = {s: load_csv(s) for s in STOCKS}

# ===============================
# 2. SIMPLE STRATEGY (FAST)
# ===============================
def strategy(df):
    df = df.copy()
    df['sma_20'] = df['Close'].rolling(20).mean()
    df['signal'] = (df['Close'] > df['sma_20']).astype(int)
    df['strategy_return'] = df['signal'].shift(1) * df['return']
    df['equity'] = (1 + df['strategy_return']).cumprod()
    return df.dropna()

results = {s: strategy(df) for s, df in data.items()}

# ===============================
# 3. PORTFOLIO AGGREGATION
# ===============================
portfolio = pd.concat(
    [results[s]['equity'] for s in STOCKS],
    axis=1
)
portfolio.columns = STOCKS
portfolio['portfolio'] = portfolio.mean(axis=1)

# ===============================
# 4. DRAWDOWN
# ===============================
rolling_max = portfolio['portfolio'].cummax()
drawdown = (portfolio['portfolio'] - rolling_max) / rolling_max

# ===============================
# 5. STATISTICS
# ===============================
returns = portfolio['portfolio'].pct_change().dropna()

stats = pd.DataFrame({
    "Metric": [
        "CAGR",
        "Max Drawdown",
        "Sharpe Ratio",
        "Win Rate",
        "Total Trades"
    ],
    "Value": [
        (portfolio['portfolio'].iloc[-1]) ** (252/len(portfolio)) - 1,
        drawdown.min(),
        np.sqrt(252) * returns.mean() / returns.std(),
        (returns > 0).mean(),
        int((returns != 0).sum())
    ]
})





# ===============================
# 7. DATA TABLES
# ===============================
stats.to_csv("outputs/stats_table.csv", index=False)
portfolio.to_csv("outputs/portfolio_equity.csv")

print("✅ model_2.py complete")
print("📊 6 Interactive Plotly charts generated")
print("📄 stats_table.csv + portfolio_equity.csv saved")


# ===============================
# 6. ADVANCED INTERACTIVE PLOTS
# ===============================

def time_controls():
    return dict(
        rangeselector=dict(
            buttons=list([
                dict(count=1, label="1M", step="month", stepmode="backward"),
                dict(count=6, label="6M", step="month", stepmode="backward"),
                dict(count=1, label="1Y", step="year", stepmode="backward"),
                dict(count=3, label="3Y", step="year", stepmode="backward"),
                dict(step="all", label="ALL")
            ])
        ),
        rangeslider=dict(visible=True),
        type="date"
    )

# -------------------------------
# 1️⃣ PORTFOLIO EQUITY (ADVANCED)
# -------------------------------
fig1 = go.Figure()

fig1.add_trace(go.Scatter(
    x=portfolio.index,
    y=portfolio['portfolio'],
    mode='lines',
    name='Portfolio Equity'
))

fig1.update_layout(
    title="Portfolio Equity Curve (Interactive)",
    xaxis=time_controls(),
    yaxis_title="Equity (Normalized)",
    hovermode="x unified",
    template="plotly_white"
)

fig1.write_html("outputs/plot_1_equity_advanced.html")

# -------------------------------
# 2️⃣ DRAWDOWN (ADVANCED)
# -------------------------------
fig2 = go.Figure()

fig2.add_trace(go.Scatter(
    x=drawdown.index,
    y=drawdown,
    fill='tozeroy',
    name='Drawdown',
    line=dict(color='red')
))

fig2.update_layout(
    title="Drawdown Curve (Interactive)",
    xaxis=time_controls(),
    yaxis_title="Drawdown",
    hovermode="x unified",
    template="plotly_white"
)

fig2.write_html("outputs/plot_2_drawdown_advanced.html")

# -------------------------------
# 3️⃣ PER-STOCK EQUITY (TOGGLE)
# -------------------------------
fig3 = go.Figure()

for stock in STOCKS:
    fig3.add_trace(go.Scatter(
        x=portfolio.index,
        y=portfolio[stock],
        mode='lines',
        name=stock
    ))

fig3.update_layout(
    title="Per-Stock Equity Curves (Toggle Stocks)",
    xaxis=time_controls(),
    yaxis_title="Equity",
    hovermode="x unified",
    template="plotly_white"
)

fig3.write_html("outputs/plot_3_per_stock_advanced.html")

# -------------------------------
# 4️⃣ RETURNS DISTRIBUTION
# -------------------------------
fig4 = px.histogram(
    returns,
    nbins=50,
    title="Daily Returns Distribution",
    template="plotly_white"
)

fig4.write_html("outputs/plot_4_returns_distribution.html")

# -------------------------------
# 5️⃣ ROLLING VOLATILITY
# -------------------------------
fig5 = go.Figure()

fig5.add_trace(go.Scatter(
    x=rolling_vol.index,
    y=rolling_vol,
    name="30-Day Volatility"
))

fig5.update_layout(
    title="Rolling Volatility (Interactive)",
    xaxis=time_controls(),
    yaxis_title="Volatility",
    hovermode="x unified",
    template="plotly_white"
)

fig5.write_html("outputs/plot_5_volatility_advanced.html")