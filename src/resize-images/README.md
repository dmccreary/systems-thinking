# Image Resize and Optimization Scripts

This directory contains Python scripts for optimizing images in the Signal Processing website for better web performance.

## Scripts Overview

### 1. `compress_images.py`
**Purpose**: Compresses large images (>500KB) to approximately 300KB for optimal web performance.

**Features**:
- Automatically finds all large images in the `docs/` directory
- Uses binary search to find optimal JPEG quality settings
- Converts PNG files to JPG for better compression
- Creates backup files for safety
- Maintains visual quality while achieving 80-90% file size reduction

**Usage**:
```bash
# Run from repository root
python src/resize-images/compress_images.py
```

**Output**: 
- Compressed images as `.jpg` files
- Backup files with `.backup` extension
- Detailed compression report

### 2. `update_image_references.py`
**Purpose**: Updates markdown files to reference the new `.jpg` files instead of original `.png` files.

**Features**:
- Scans all markdown files in `docs/` directory
- Updates image references in multiple formats:
  - `![alt](image.png)` → `![alt](image.jpg)`
  - `<img src="image.png">` → `<img src="image.jpg">`
  - YAML frontmatter image references
  - Social media meta tags
- Only updates references where PNG was actually converted to JPG

**Usage**:
```bash
# Run after compress_images.py
python src/resize-images/update_image_references.py
```

### 3. `cleanup_backups.py`
**Purpose**: Removes backup files after successful compression to free up disk space.

**Features**:
- Finds all `.backup` files created during compression
- Reports total space that will be freed
- Safely removes backup files
- Provides cleanup summary

**Usage**:
```bash
# Run after verifying compression was successful
python src/resize-images/cleanup_backups.py
```

## Complete Workflow

To optimize all images in the website:

1. **Compress images**:
   ```bash
   python src/resize-images/compress_images.py
   ```

2. **Update markdown references**:
   ```bash
   python src/resize-images/update_image_references.py
   ```

3. **Test the website** locally:
   ```bash
   mkdocs serve
   ```

4. **Clean up backups** (optional, after verifying everything works):
   ```bash
   python src/resize-images/cleanup_backups.py
   ```

## Requirements

- Python 3.x
- Pillow (PIL) library: `pip install Pillow`

## Results from Last Run

**Compression Results**:
- **73 images** processed
- **Original size**: 217.4MB
- **Final size**: 21.0MB
- **Savings**: 196.3MB (90.3% reduction)

**Reference Updates**:
- **5 markdown files** updated
- **69 image references** changed from PNG to JPG

## File Size Targets

- **Story images**: ~300KB each (down from 1.5-3.7MB)
- **Cover images**: ~300KB each
- **General graphics**: ~300KB each

This optimization dramatically improves:
- Page load times
- Mobile user experience
- SEO performance
- Bandwidth efficiency

## Safety Features

- **Backup creation**: Original files are preserved with `.backup` extension
- **Selective processing**: Only processes files that need compression
- **Quality optimization**: Automatically finds best quality/size balance
- **Reference tracking**: Only updates markdown files where conversion occurred

## Notes

- The scripts are designed to be run from the repository root directory
- PNG to JPG conversion is used for maximum compression efficiency
- Original file timestamps and metadata are preserved where possible
- Scripts include error handling and detailed progress reporting