#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Stage 2 Runner: Worker for Active Theme Curation & 4-Tier Weighting Scoring.
Executes stage2_curator.py and verifies data/stage2_curated_news.xlsx & data/stage2_curated_report.md.
"""

import sys
import os
import subprocess

# Force UTF-8 encoding for stdout on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def main():
    print("🎯 [Stage 2 Worker] Starting Active Theme Curation & 4-Tier Weighting Scoring...")
    python_exe = sys.executable
    cmd = [python_exe, "stage2_curator.py"] + sys.argv[1:]
    
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    print(result.stdout)
    if result.stderr:
        print(f"⚠️ [Stage 2 Warning]: {result.stderr}")
        
    xlsx_path = os.path.join("data", "stage2_curated_news.xlsx")
    report_path = os.path.join("data", "stage2_curated_report.md")
    
    # Fallback check for existing agent_B path if legacy
    if not os.path.exists(xlsx_path) and os.path.exists(os.path.join("data", "agent_B_curated_news.xlsx")):
        xlsx_path = os.path.join("data", "agent_B_curated_news.xlsx")
    if not os.path.exists(report_path) and os.path.exists(os.path.join("data", "agent_B_curated_report.md")):
        report_path = os.path.join("data", "agent_B_curated_report.md")
        
    if os.path.exists(xlsx_path) and os.path.exists(report_path):
        print("✅ [Stage 2 Result] Successfully curated news and generated reports!")
        print(f"   - Curated Excel: {xlsx_path}")
        print(f"   - Report Markdown: {report_path}")
    else:
        print("❌ [Stage 2 Error] Curated output files missing.")

if __name__ == "__main__":
    main()
