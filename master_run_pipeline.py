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
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8", bufsize=1)
    
    if proc.stdout:
        for line in proc.stdout:
            print(line, end="", flush=True)
            
    proc.wait()
    elapsed = time.time() - start_time
        
    if proc.returncode == 0:
        print(f"✅ {description} completed successfully in {elapsed:.2f}s!")
    else:
        print(f"❌ Error running {script_name} (Exit code: {proc.returncode})")
        return False
    return True

def main():
    import argparse
    parser = argparse.ArgumentParser(description="Master AI Newsletter Pipeline")
    parser.add_argument("--mode", choices=["theme"], default="theme",
                        help="Pipeline mode: 'theme' (主題專題模式, 20 篇)")
    parser.add_argument("--since", default=os.environ.get("START_DATE", "2026-08-01"),
                        help="Filter articles starting from date (default: '2026-08-01')")
    args, unknown = parser.parse_known_args()
    
    pipeline_mode = args.mode.lower()
    os.environ["PIPELINE_MODE"] = pipeline_mode
    os.environ["START_DATE"] = args.since

    mode_label = f"【主題專題模式】(過濾 {args.since} 起之最新新聞)"
    print(f"🌟 Starting AI Newsletter Publishing Pipeline - {mode_label}...")
    print("ℹ️  Note: Stage 1 (Incremental News Listener) runs incrementally via scheduler or 'python stage1_news_fetcher.py'.")
    
    extra_args = ["--mode", pipeline_mode, "--since", args.since]

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
