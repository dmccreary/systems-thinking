#!/usr/bin/env python3
"""
Cleanup script to remove backup files after successful compression
"""

import os
from pathlib import Path

def cleanup_backups():
    """Remove .backup files created during compression"""
    
    # Navigate to repo root from src/resize-images/
    repo_root = Path(__file__).parent.parent.parent
    docs_dir = repo_root / "docs"
    
    backup_files = []
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.backup'):
                backup_files.append(Path(root) / file)
    
    if not backup_files:
        print("✅ No backup files found")
        return
    
    print(f"🔍 Found {len(backup_files)} backup files")
    
    total_size = 0
    for backup_file in backup_files:
        total_size += backup_file.stat().st_size
    
    print(f"📊 Total backup size: {total_size / (1024*1024):.1f}MB")
    print("\n🗑️  Removing backup files...")
    
    removed_count = 0
    for backup_file in backup_files:
        try:
            backup_file.unlink()
            removed_count += 1
            print(f"  ✅ Removed: {backup_file}")
        except Exception as e:
            print(f"  ❌ Error removing {backup_file}: {e}")
    
    print(f"\n📊 Cleanup Summary:")
    print(f"  • Backup files removed: {removed_count}")
    print(f"  • Space freed: {total_size / (1024*1024):.1f}MB")

if __name__ == "__main__":
    print("🧹 Starting backup cleanup...")
    cleanup_backups()
    print("✅ Cleanup complete!")