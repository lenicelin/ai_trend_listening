#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Stage 1 Runner: Worker for Incremental News Crawling & Basic Quality Filter (Maximize Recall).
Executes stage1_news_fetcher.py and verifies dataset integrity for data/stage1_ai_news.json.
"""

import sys
import os
import subprocess
import json

# Force UTF-8 encoding for stdout on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def main():
    print("🚀 [Stage 1 Worker] Starting News Crawling & Quality Verification...")
    python_exe = sys.executable
    cmd = [python_exe, "stage1_news_fetcher.py"]
    
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    print(result.stdout)
    if result.stderr:
        print(f"⚠️ [Stage 1 Warning]: {result.stderr}")
        
    json_path = os.path.join("data", "stage1_ai_news.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            total = data.get("total_count", 0)
            updated = data.get("updated_at", "")
            print(f"✅ [Stage 1 Result] Successfully updated database!")
            print(f"   - Total Accumulated Articles: {total} 篇")
            print(f"   - Last Updated Time: {updated}")
    else:
        print("❌ [Stage 1 Error] JSON dataset not found.")

if __name__ == "__main__":
    main()
