#!/usr/bin/env python3
"""
Update image references from .png to .jpg in markdown files
"""

import os
import re
from pathlib import Path

def update_markdown_files():
    """Update all markdown files to reference .jpg instead of .png where conversion occurred"""
    
    # Navigate to repo root from src/resize-images/
    repo_root = Path(__file__).parent.parent.parent
    docs_dir = repo_root / "docs"
    
    # Find all markdown files
    markdown_files = []
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(Path(root) / file)
    
    print(f"🔍 Found {len(markdown_files)} markdown files to check")
    
    updated_files = []
    total_replacements = 0
    
    for md_file in markdown_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Replace .png with .jpg for images that were converted
            # Pattern to match image references
            patterns = [
                r'!\[([^\]]*)\]\(([^)]*\.png)\)',  # ![alt](image.png)
                r'<img[^>]*src="([^"]*\.png)"[^>]*>',  # <img src="image.png">
                r'image:\s*([^\s]*\.png)',  # YAML front matter image: path.png
                r'og:image:\s*([^\s]*\.png)',  # og:image: path.png
                r'twitter:image:\s*([^\s]*\.png)',  # twitter:image: path.png
            ]
            
            file_replacements = 0
            
            for pattern in patterns:
                matches = re.findall(pattern, content)
                for match in matches:
                    if isinstance(match, tuple):
                        # Handle tuple matches from capture groups
                        for captured_path in match:
                            if captured_path.endswith('.png'):
                                # Check if corresponding .jpg exists
                                if '/' in captured_path:
                                    # Relative or absolute path
                                    png_path = docs_dir / captured_path.lstrip('/')
                                else:
                                    # Just filename, look in same directory as markdown
                                    png_path = md_file.parent / captured_path
                                
                                jpg_path = png_path.with_suffix('.jpg')
                                
                                if jpg_path.exists() and not png_path.exists():
                                    # PNG was converted to JPG
                                    content = content.replace(captured_path, captured_path.replace('.png', '.jpg'))
                                    file_replacements += 1
                    else:
                        # Handle single string matches
                        if match.endswith('.png'):
                            png_path = docs_dir / match.lstrip('/')
                            jpg_path = png_path.with_suffix('.jpg')
                            
                            if jpg_path.exists() and not png_path.exists():
                                content = content.replace(match, match.replace('.png', '.jpg'))
                                file_replacements += 1
            
            # Write back if changes were made
            if content != original_content:
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files.append(str(md_file))
                total_replacements += file_replacements
                print(f"  ✅ Updated {md_file}: {file_replacements} references changed")
        
        except Exception as e:
            print(f"  ❌ Error processing {md_file}: {e}")
    
    print(f"\n📊 Summary:")
    print(f"  • Files updated: {len(updated_files)}")
    print(f"  • Total references updated: {total_replacements}")
    
    if updated_files:
        print(f"\n📝 Updated files:")
        for file in updated_files:
            print(f"  • {file}")

if __name__ == "__main__":
    print("🔄 Updating image references from .png to .jpg...")
    update_markdown_files()
    print("✅ Reference update complete!")