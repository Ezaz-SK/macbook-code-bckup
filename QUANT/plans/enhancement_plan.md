# Streamlit Dashboard Enhancement Plan: Behavior Analysis Graphs

## Current State Analysis

The existing Streamlit app (`app_streamlit_fusion.py`) provides:
- Dual-axis line chart: TCS stock price vs. behavioral score
- Key metrics: Avg behavioral score, bullish days, high confidence BUY count
- Data table: Final decisions with date, price, signals, scores, and decisions

## Available Data Sources

### News Data (`quant_trading/news_engine/data/csv/`)
- Columns: published_at, source, author, title, description, url, sentiment_compound, sentiment_label, importance_weight, recency_decay, behavioural_score
- Aggregated daily by mean behavioural_score
- Sentiment labels: positive, negative, neutral

### Price Data (`quant_trading/outputs/price_data.csv`)
- Columns: date, close, price_signal (BUY/HOLD/SELL)

### Final Decisions (`quant_trading/outputs/final_decisions.csv`)
- Merged dataset: date, close, price_signal, behavioural_score, news_bias, final_decision

## Proposed Enhancements

### 1. Sentiment Trends Over Time
**Type:** Line chart with moving averages
**Data:** Daily behavioural_score time series
**Purpose:** Visualize sentiment evolution and identify trends/patterns
**Implementation:** Add 7-day and 30-day moving averages

### 2. News Volume Analysis
**Type:** Bar chart with overlay
**Data:** Count of news articles per day
**Purpose:** Show news frequency and correlate with market volatility
**Implementation:** Group news by date, count articles, overlay with price volatility

### 3. Sentiment-Price Correlation
**Type:** Scatter plot with regression line
**Data:** behavioural_score vs. daily price returns
**Purpose:** Quantify relationship between news sentiment and price movements
**Implementation:** Calculate daily returns, plot correlation coefficient

### 4. Sentiment Distribution
**Type:** Pie chart / Donut chart
**Data:** Count of sentiment_label (positive/negative/neutral)
**Purpose:** Overall sentiment composition
**Implementation:** Aggregate sentiment labels across all news

### 5. News Sources Impact
**Type:** Horizontal bar chart
**Data:** Average behavioural_score by source
**Purpose:** Identify which news sources have most bullish/bearish impact
**Implementation:** Group by source, calculate mean behavioural_score

### 6. Rolling Correlation Analysis
**Type:** Time series line chart
**Data:** 30-day rolling correlation between behavioural_score and price
**Purpose:** Show how sentiment-price relationship changes over time
**Implementation:** Use pandas rolling correlation

### 7. Decision Accuracy Metrics
**Type:** Bar chart / Confusion matrix visualization
**Data:** final_decision vs. actual next-day price movement
**Purpose:** Evaluate trading signal effectiveness
**Implementation:** Compare BUY signals with positive returns, SELL with negative

### 8. Weekly Sentiment Patterns
**Type:** Heatmap
**Data:** Average behavioural_score by day of week
**Purpose:** Identify weekly patterns in news sentiment
**Implementation:** Group by weekday, show heatmap

### 9. Cumulative Returns Simulation
**Type:** Line chart comparing strategies
**Data:** Backtest returns based on final_decision signals
**Purpose:** Show hypothetical portfolio performance
**Implementation:** Calculate cumulative returns for BUY/HOLD/SELL vs. buy-and-hold

### 10. News Impact Analysis
**Type:** Before/after event study
**Data:** Price changes around high-impact news days
**Purpose:** Measure immediate market reaction to news
**Implementation:** Identify days with extreme behavioural_score, plot price movement ±3 days

## Implementation Plan

### Phase 1: Core Analytics (Priority 1-3)
1. Add sentiment trends chart with moving averages
2. Implement news volume bar chart
3. Create correlation scatter plot

### Phase 2: Advanced Visualizations (Priority 4-6)
4. Add sentiment distribution pie chart
5. Build news sources impact chart
6. Implement rolling correlation time series

### Phase 3: Performance Metrics (Priority 7-8)
7. Create decision accuracy visualization
8. Add weekly patterns heatmap

### Phase 4: Advanced Features (Priority 9-10)
9. Implement cumulative returns simulation
10. Add news impact event study

## Technical Considerations

- Use Plotly for interactive charts
- Implement caching for performance
- Add sidebar filters for date ranges and sentiment thresholds
- Ensure responsive design for multiple charts
- Add tooltips and hover information
- Consider chart export functionality

## UI/UX Improvements

- Organize charts in tabs or expandable sections
- Add chart descriptions and insights
- Implement dark/light theme toggle
- Add refresh button for real-time data updates
- Include help tooltips for complex metrics

## Data Processing Requirements

- Calculate daily returns from price data
- Implement rolling statistics (moving averages, correlations)
- Aggregate news data by various dimensions (date, source, sentiment)
- Create derived metrics (volatility, cumulative returns)

## Success Metrics

- Improved user engagement with interactive visualizations
- Better insight generation from news-price relationships
- Enhanced decision-making capabilities for traders
- Scalable architecture for additional stocks/symbols