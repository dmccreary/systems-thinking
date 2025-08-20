#!/usr/bin/env python3
"""
Complete image optimization workflow
Runs all three scripts in the correct sequence
"""

import subprocess
import sys
from pathlib import Path

def run_script(script_name, description):
    """Run a script and handle errors"""
    print(f"\n{'='*60}")
    print(f"🚀 {description}")
    print(f"{'='*60}")
    
    script_path = Path(__file__).parent / script_name
    
    try:
        result = subprocess.run([sys.executable, str(script_path)], 
                              capture_output=False, 
                              text=True, 
                              check=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed with error code {e.returncode}")
        return False
    except Exception as e:
        print(f"❌ {description} failed: {e}")
        return False

def main():
    print("🎯 Starting Complete Image Optimization Workflow")
    print("This will compress images, update references, and optionally clean up backups")
    
    success_count = 0
    
    # Step 1: Compress images
    if run_script("compress_images.py", "Image Compression"):
        success_count += 1
    else:
        print("❌ Stopping workflow due to compression failure")
        return
    
    # Step 2: Update references
    if run_script("update_image_references.py", "Reference Updates"):
        success_count += 1
    else:
        print("⚠️  Compression succeeded but reference update failed")
        print("   You may need to manually update markdown files")
    
    # Step 3: Ask about cleanup
    print(f"\n{'='*60}")
    print("🧹 Backup Cleanup (Optional)")
    print(f"{'='*60}")
    print("The compression created backup files of original images.")
    print("These can be removed to free up disk space after verifying everything works.")
    print("\nRecommendation: Test your website first with 'mkdocs serve'")
    
    response = input("\nRemove backup files now? (y/N): ").lower().strip()
    if response == 'y':
        if run_script("cleanup_backups.py", "Backup Cleanup"):
            success_count += 1
        else:
            print("⚠️  Backup cleanup failed - files are still safe")
    else:
        print("ℹ️  Backup files preserved. Run cleanup_backups.py manually when ready.")
    
    # Summary
    print(f"\n{'='*60}")
    print("📊 Workflow Summary")
    print(f"{'='*60}")
    print(f"✅ Successful steps: {success_count}")
    
    if success_count >= 2:
        print("🎉 Image optimization completed successfully!")
        print("\nNext steps:")
        print("1. Test your website: mkdocs serve")
        print("2. Check that images load correctly")
        print("3. If everything looks good, run cleanup_backups.py to remove backups")
    else:
        print("⚠️  Workflow completed with issues. Check the output above.")

if __name__ == "__main__":
    main()