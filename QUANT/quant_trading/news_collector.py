import os
import requests
import pandas as pd
import numpy as np
from datetime import datetime, timezone
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# ===============================
# 0. CONFIG
# ===============================
API_KEY = "cfb28faadbee4aa2b63ede6ca627db41"  # move to env later

QUERY = "TCS OR Tata Consultancy Services"
LANGUAGE = "en"
SORT_BY = "publishedAt"
PAGE_SIZE = 100

BASE_DIR = os.getcwd()
NEWS_DIR = os.path.join(BASE_DIR, "news_engine", "data")

CSV_DIR = os.path.join(NEWS_DIR, "csv")
TXT_DIR = os.path.join(NEWS_DIR, "txt")
JSON_DIR = os.path.join(NEWS_DIR, "json")

for d in [CSV_DIR, TXT_DIR, JSON_DIR]:
    os.makedirs(d, exist_ok=True)

# ===============================
# 1. FETCH NEWS
# ===============================
def fetch_news():
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": QUERY,
        "language": LANGUAGE,
        "sortBy": SORT_BY,
        "pageSize": PAGE_SIZE,
        "apiKey": API_KEY
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

# ===============================
# 2. IMPORTANCE WEIGHTING
# ===============================
def importance_weight(title, description):
    text = f"{title} {description}".lower()

    if any(k in text for k in ["earnings", "profit", "results", "revenue"]):
        return 1.0
    if any(k in text for k in ["regulation", "rbi", "sebi", "policy"]):
        return 0.9
    if any(k in text for k in ["merger", "acquisition", "deal"]):
        return 0.8
    if any(k in text for k in ["ceo", "management", "board"]):
        return 0.7
    if any(k in text for k in ["forecast", "outlook", "guidance"]):
        return 0.6
    if any(k in text for k in ["opinion", "analyst", "view"]):
        return 0.3

    return 0.4

# ===============================
# 3. RECENCY DECAY
# ===============================
def recency_decay(published_at, half_life=3):
    try:
        published_time = datetime.fromisoformat(
            published_at.replace("Z", "")
        ).replace(tzinfo=timezone.utc)

        now = datetime.now(timezone.utc)
        days_old = (now - published_time).days

        return np.exp(-days_old / half_life)
    except Exception:
        return 0.5

# ===============================
# 4. SENTIMENT + BEHAVIOURAL SCORE
# ===============================
analyzer = SentimentIntensityAnalyzer()

def analyze_news(articles):
    records = []

    for article in articles:
        title = article.get("title") or ""
        description = article.get("description") or ""
        published_at = article.get("publishedAt")

        text = f"{title} {description}"
        score = analyzer.polarity_scores(text)

        imp = importance_weight(title, description)
        decay = recency_decay(published_at)

        behavioural_score = score["compound"] * imp * decay

        records.append({
            "published_at": published_at,
            "source": article.get("source", {}).get("name"),
            "author": article.get("author"),
            "title": title,
            "description": description,
            "url": article.get("url"),
            "sentiment_compound": score["compound"],
            "sentiment_label": (
                "positive" if score["compound"] > 0.05
                else "negative" if score["compound"] < -0.05
                else "neutral"
            ),
            "importance_weight": imp,
            "recency_decay": decay,
            "behavioural_score": behavioural_score
        })

    return pd.DataFrame(records)

# ===============================
# 5. SAVE OUTPUTS
# ===============================
def save_outputs(df, raw_json):
    today = datetime.now().strftime("%Y-%m-%d")

    csv_path = os.path.join(CSV_DIR, f"tcs_news_{today}.csv")
    df.to_csv(csv_path, index=False)

    txt_path = os.path.join(TXT_DIR, f"tcs_news_{today}.txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        for _, row in df.iterrows():
            f.write(f"TITLE: {row['title']}\n")
            f.write(f"DATE: {row['published_at']}\n")
            f.write(f"SOURCE: {row['source']}\n")
            f.write(
                f"SENTIMENT: {row['sentiment_label']} "
                f"(score={row['sentiment_compound']:.2f})\n"
            )
            f.write(
                f"IMPORTANCE: {row['importance_weight']} | "
                f"DECAY: {row['recency_decay']:.2f}\n"
            )
            f.write(f"BEHAVIOURAL SCORE: {row['behavioural_score']:.3f}\n")
            f.write(f"CONTENT: {row['description']}\n")
            f.write("-" * 80 + "\n")

    json_path = os.path.join(JSON_DIR, f"tcs_news_{today}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        import json
        json.dump(raw_json, f, indent=2)

    print("✅ News saved successfully")
    print(csv_path)
    print(txt_path)
    print(json_path)

# ===============================
# 6. MAIN PIPELINE
# ===============================
def run():
    print("📰 Fetching news for TCS...")
    raw = fetch_news()

    articles = raw.get("articles", [])
    if not articles:
        print("⚠️ No news found.")
        return

    df = analyze_news(articles)
    save_outputs(df, raw)

if __name__ == "__main__":
    run()
