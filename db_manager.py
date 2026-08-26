#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI Trend Listening - Database Manager (PostgreSQL Exclusively)
Supports PostgreSQL with pgvector for high concurrency, vector embeddings, and zero write lock contention.
"""

import os
import sys
import json
from dotenv import load_dotenv

# Force UTF-8 encoding for stdout on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

load_dotenv()

def get_db_url():
    url = os.getenv("DATABASE_URL")
    if not url:
        user = os.getenv("POSTGRES_USER", "postgres")
        password = os.getenv("POSTGRES_PASSWORD", "postgres")
        host = os.getenv("POSTGRES_HOST", "localhost")
        port = os.getenv("POSTGRES_PORT", "5432")
        db = os.getenv("POSTGRES_DB", "ai_trend_listening")
        url = f"postgresql://{user}:{password}@{host}:{port}/{db}"
    return url

def get_connection(db_path=None):
    """
    Returns a database connection tuple ("postgresql", conn).
    Exclusively connects to PostgreSQL database.
    """
    import psycopg2
    from psycopg2.extras import RealDictCursor
    try:
        conn = psycopg2.connect(get_db_url(), cursor_factory=RealDictCursor, connect_timeout=10)
        conn.autocommit = False
        return "postgresql", conn
    except Exception as e:
        raise RuntimeError(f"PostgreSQL Database Connection Error: {e}")

def init_db(db_path=None):
    """Initialize database tables and indexes for PostgreSQL."""
    _, conn = get_connection(db_path)
    cursor = conn.cursor()

    # Enable pgvector extension if available
    try:
        cursor.execute("CREATE EXTENSION IF NOT EXISTS vector;")
    except Exception:
        conn.rollback()

    # 1. Stage 1 Accumulated Articles Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        link TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        pub_date TEXT,
        source TEXT,
        summary TEXT,
        category TEXT,
        quality_score TEXT,
        crawled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        embedding vector(1536)
    );
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_articles_link ON articles(link);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(pub_date);")

    # 2. Weekly Newsletter Themes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS weekly_themes (
        id SERIAL PRIMARY KEY,
        issue_tag TEXT UNIQUE NOT NULL,
        issue_date TEXT,
        theme_title TEXT NOT NULL,
        focus_domains TEXT,
        status TEXT DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 3. Stage 2 Curated Articles Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS curated_articles (
        id SERIAL PRIMARY KEY,
        issue_tag TEXT NOT NULL,
        article_link TEXT NOT NULL,
        score TEXT,
        functional_tags TEXT,
        title TEXT NOT NULL,
        pub_date TEXT,
        source TEXT,
        rationale TEXT,
        description TEXT,
        curated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(issue_tag, article_link)
    );
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_curated_issue ON curated_articles(issue_tag);")

    conn.commit()
    conn.close()

# --- Stage 1 Database Operations ---

def batch_upsert_articles(articles, db_path=None):
    """Insert or update articles in PostgreSQL based on unique link."""
    if isinstance(articles, dict):
        articles = articles.get("articles", [])

    if not articles:
        return 0

    init_db(db_path)
    _, conn = get_connection(db_path)
    cursor = conn.cursor()

    count = 0
    for art in articles:
        link = str(art.get("link", "")).strip()
        title = str(art.get("title", "")).strip()
        if not link or not title:
            continue

        pub_date = str(art.get("pub_date", "")).strip()
        source = str(art.get("source", "")).strip()
        summary = str(art.get("summary", art.get("description", ""))).strip()
        category = str(art.get("category", art.get("tags", ""))).strip()
        quality_score = str(art.get("score", art.get("quality_score", "75 分"))).strip()

        cursor.execute("""
        INSERT INTO articles (link, title, pub_date, source, summary, category, quality_score)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT(link) DO UPDATE SET
            title=EXCLUDED.title,
            pub_date=EXCLUDED.pub_date,
            source=EXCLUDED.source,
            summary=EXCLUDED.summary,
            category=EXCLUDED.category,
            quality_score=EXCLUDED.quality_score;
        """, (link, title, pub_date, source, summary, category, quality_score))
        count += 1

    conn.commit()
    conn.close()
    return count

def get_all_articles(db_path=None):
    """Retrieve all articles stored in PostgreSQL."""
    _, conn = get_connection(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT link, title, pub_date, source, summary, category, quality_score FROM articles ORDER BY pub_date DESC, id DESC;")
    rows = cursor.fetchall()
    conn.close()

    articles = []
    for r in rows:
        articles.append({
            "link": r["link"],
            "title": r["title"],
            "pub_date": r["pub_date"],
            "source": r["source"],
            "summary": r["summary"],
            "description": r["summary"],
            "category": r["category"],
            "tags": r["category"],
            "score": r["quality_score"]
        })
    return articles

# --- Weekly Theme Operations ---

def save_theme(issue_tag, issue_date, theme_title, focus_domains, status="Active", db_path=None):
    """Save or update weekly theme in PostgreSQL."""
    init_db(db_path)
    _, conn = get_connection(db_path)
    cursor = conn.cursor()

    if status == "Active":
        cursor.execute("UPDATE weekly_themes SET status = 'Completed' WHERE status = 'Active';")

    cursor.execute("""
    INSERT INTO weekly_themes (issue_tag, issue_date, theme_title, focus_domains, status)
    VALUES (%s, %s, %s, %s, %s)
    ON CONFLICT(issue_tag) DO UPDATE SET
        issue_date=EXCLUDED.issue_date,
        theme_title=EXCLUDED.theme_title,
        focus_domains=EXCLUDED.focus_domains,
        status=EXCLUDED.status;
    """, (issue_tag, issue_date, theme_title, focus_domains, status))

    conn.commit()
    conn.close()

def get_active_theme_from_db(db_path=None):
    """Retrieve currently active weekly theme from PostgreSQL."""
    _, conn = get_connection(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT issue_tag, issue_date, theme_title, focus_domains FROM weekly_themes WHERE status = 'Active' ORDER BY id DESC LIMIT 1;")
    row = cursor.fetchone()
    conn.close()

    if row:
        return row["issue_tag"], row["theme_title"], row["focus_domains"]
    return None

# --- Stage 2 Curated Articles Operations ---

def save_curated_articles(issue_tag, curated_list, db_path=None):
    """Save curated articles for a specific issue into PostgreSQL."""
    if not curated_list:
        return 0

    init_db(db_path)
    _, conn = get_connection(db_path)
    cursor = conn.cursor()

    # Clear old curated entries for this issue
    cursor.execute("DELETE FROM curated_articles WHERE issue_tag = %s;", (issue_tag,))

    count = 0
    for item in curated_list:
        link = str(item.get("link", "")).strip()
        title = str(item.get("title", "")).strip()
        if not link or not title:
            continue

        score = str(item.get("score", "75 分")).strip()
        tags = str(item.get("functional_tags", item.get("tags", ""))).strip()
        pub_date = str(item.get("pub_date", "")).strip()
        source = str(item.get("source", "")).strip()
        rationale = str(item.get("rationale", "")).strip()
        description = str(item.get("description", "")).strip()

        cursor.execute("""
        INSERT INTO curated_articles (issue_tag, article_link, score, functional_tags, title, pub_date, source, rationale, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT(issue_tag, article_link) DO UPDATE SET
            score=EXCLUDED.score,
            functional_tags=EXCLUDED.functional_tags,
            title=EXCLUDED.title,
            pub_date=EXCLUDED.pub_date,
            source=EXCLUDED.source,
            rationale=EXCLUDED.rationale,
            description=EXCLUDED.description;
        """, (issue_tag, link, score, tags, title, pub_date, source, rationale, description))
        count += 1

    conn.commit()
    conn.close()
    return count

def get_curated_articles_by_issue(issue_tag, db_path=None):
    """Get curated articles for an issue from PostgreSQL."""
    _, conn = get_connection(db_path)
    cursor = conn.cursor()
    cursor.execute("""
    SELECT score, functional_tags as tags, title, pub_date, article_link as link, source, rationale, description
    FROM curated_articles
    WHERE issue_tag = %s
    ORDER BY id ASC;
    """, (issue_tag,))
    rows = cursor.fetchall()
    conn.close()

    return [dict(r) for r in rows]

if __name__ == "__main__":
    init_db()
    backend, _ = get_connection()
    print(f"✨ [Database Manager] PostgreSQL Database initialized successfully. Active Backend: {backend.upper()}")
