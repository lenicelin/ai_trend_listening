#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI Trend Listening Automated Scheduler Service
- Task 1: Stage 1 (stage1_news_fetcher.py) - Runs daily at 17:00 to fetch & accumulate high-quality AI news.
- Task 2: Master Pipeline (master_run_pipeline.py) - Runs weekly every Friday at 09:00 AM to curate theme, build newsletter, and archive.
"""

import sys
import os
import time
import subprocess
from datetime import datetime

# Force UTF-8 encoding for stdout on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def run_script(script_name, name):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n[{timestamp}] ⏰ [Scheduler] Executing {name} ({script_name})...")
    python_exe = sys.executable
    cmd = [python_exe, script_name]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
        if res.returncode == 0:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ {name} completed successfully.")
        else:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ {name} failed: {res.stderr[:200]}")
    except Exception as e:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ Execution exception: {e}")

def main():
    print("==================================================")
    print("🚀 AI Trend Listening Automatic Scheduler Service (Multi-Stage)")
    print("==================================================")
    print("📌 Strategy:")
    print("   1. Task 1 - Stage 1 (Incremental News Listener): Runs daily at 17:00 (accumulates news from 2026-07-27 onwards)")
    print("   2. Task 2 - Master Pipeline (Stage 2 ➔ Stage 3 ➔ Archive Engine): Runs weekly every Friday at 09:00 AM")
    print("Press Ctrl+C to stop.\n")

    last_stage1_date = ""
    last_pipeline_date = ""

    while True:
        now = datetime.now()
        today_str = now.strftime("%Y-%m-%d")

        # Task 1: Trigger Stage 1 daily at 17:00
        if now.hour == 17 and now.minute == 0 and last_stage1_date != today_str:
            print(f"\n🔔 [Daily Trigger 17:00] Starting Daily News Fetch (Stage 1) for {today_str}...")
            run_script("stage1_news_fetcher.py", "Stage 1 (Incremental News Fetcher)")
            last_stage1_date = today_str

        # Task 2: Trigger Master Pipeline (Stage 2 -> Stage 3 -> Stage 4) weekly on Friday at 09:00 AM
        # now.weekday() == 4 represents Friday (Monday is 0, Sunday is 6)
        if now.weekday() == 4 and now.hour == 9 and now.minute == 0 and last_pipeline_date != today_str:
            print(f"\n🔔 [Weekly Trigger Friday 09:00 AM] Starting Master Pipeline (Stage 2 ➔ Stage 3 ➔ Archive Engine) for {today_str}...")
            run_script("master_run_pipeline.py", "Master Pipeline (Stage 2 ➔ Stage 3 ➔ Archive Engine)")
            last_pipeline_date = today_str

        time.sleep(15)  # Check loop every 15 seconds

if __name__ == "__main__":
    main()
