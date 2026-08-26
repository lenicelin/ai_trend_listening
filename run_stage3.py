#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Stage 3 Runner: Worker for Zero-Hallucination Newsletter Building & Archiving.
Executes stage3_newsletter_builder.py and stage3_archive_engine.py.
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
    print("📰 [Stage 3 Worker] Starting Newsletter Builder & Archive Engine...")
    python_exe = sys.executable
    
    # Step 1: Newsletter Builder
    cmd_build = [python_exe, "stage3_newsletter_builder.py"]
    res_build = subprocess.run(cmd_build, capture_output=True, text=True, encoding="utf-8")
    print(res_build.stdout)
    if res_build.stderr:
        print(f"⚠️ [Stage 3 Build Notice]: {res_build.stderr}")
        
    # Step 2: Archive Engine
    cmd_arc = [python_exe, "stage3_archive_engine.py"]
    res_arc = subprocess.run(cmd_arc, capture_output=True, text=True, encoding="utf-8")
    print(res_arc.stdout)
    if res_arc.stderr:
        print(f"⚠️ [Stage 3 Archive Notice]: {res_arc.stderr}")

    html_path = "newsletter.html"
    json_path = os.path.join("data", "newsletter_cases.json")
    
    if os.path.exists(html_path) and os.path.exists(json_path):
        print("✅ [Stage 3 Result] Newsletter & Archiving successfully completed!")
        print(f"   - Main Newsletter Page: {html_path}")
        print(f"   - Cases JSON Dataset: {json_path}")
        print(f"   - Archive Folder: Check archives/ directory for newly saved issue!")
    else:
        print("❌ [Stage 3 Error] Newsletter output files missing.")

if __name__ == "__main__":
    main()
