#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Master Pipeline Script: Executes Stage 1 -> Stage 2 -> Stage 3 -> Archive Engine.
Runs full end-to-end news listening, theme curation, newsletter generation, and automatic archiving.
"""

import os
import sys
import subprocess
import time

# Force UTF-8 encoding for stdout on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def run_stage(script_name, description, extra_args=None):
    print(f"\n==================================================")
    print(f"🚀 [Pipeline] Running {description} ({script_name})...")
    print(f"==================================================")
    
    python_exe = sys.executable
    cmd = [python_exe, script_name]
    if extra_args:
        cmd.extend(extra_args)
    
    start_time = time.time()
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    elapsed = time.time() - start_time
    
    print(result.stdout)
    if result.stderr:
        print(f"⚠️ [Notice/Stderr]:\n{result.stderr}")
        
    if result.returncode == 0:
        print(f"✅ {description} completed successfully in {elapsed:.2f}s!")
    else:
        print(f"❌ Error running {script_name} (Exit code: {result.returncode})")
        return False
    return True

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Master AI Newsletter Pipeline")
    parser.add_argument("--mode", choices=["theme", "express"], default=os.environ.get("PIPELINE_MODE", "theme"),
                        help="Pipeline mode: 'theme' (專題電子報, 20 篇) or 'express' (每週趨勢快報, 6 篇)")
    args, unknown = parser.parse_known_args()
    
    pipeline_mode = args.mode.lower()
    os.environ["PIPELINE_MODE"] = pipeline_mode

    mode_label = "【每週趨勢快報模式】(6 篇精選速報)" if pipeline_mode == "express" else "【主題專題模式】(20 篇主題精選)"
    print(f"🌟 Starting AI Newsletter Publishing Pipeline - {mode_label}...")
    print("ℹ️  Note: Stage 1 (Incremental News Listener) runs incrementally via scheduler or 'python stage1_news_fetcher.py'.")
    
    extra_args = ["--mode", pipeline_mode]

    # Step 1: Stage 2 - Active Theme Curation & Scoring
    if not run_stage("stage2_curator.py", f"Stage 2 - News Curation ({pipeline_mode})", extra_args):
        print("🛑 Pipeline stopped at Stage 2 due to errors.")
        return
        
    # Step 2: Stage 3 - Newsletter Generation
    if not run_stage("stage3_newsletter_builder.py", f"Stage 3 - Newsletter Builder & UX Sync ({pipeline_mode})", extra_args):
        print("🛑 Pipeline stopped at Stage 3 due to errors.")
        return
        
    # Step 3: Archive Engine - Automatically archive into archives/ folder
    if not run_stage("stage3_archive_engine.py", "Archive Engine - Issue Archiving"):
        print("🛑 Pipeline stopped at Archive Engine due to errors.")
        return
        
    print("\n🎉 [SUCCESS] AI Newsletter Publishing Pipeline & Archiving completed smoothly!")
    print("👉 Open newsletter.html or check the archives/ directory to view saved issues!")

if __name__ == "__main__":
    main()
