#!/usr/bin/env python3
"""
JSON Diff Tool - Compare JSON files ignoring insignificant whitespace and formatting
Usage: python json-diff.py file1.json file2.json
"""

import json
import argparse
import sys
import difflib
from typing import Dict, Any, List, Union

def load_json_file(filepath: str) -> Dict[str, Any]:
    """Load and parse a JSON file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found.", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{filepath}': {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error reading '{filepath}': {e}", file=sys.stderr)
        sys.exit(1)

def normalize_json(data: Dict[str, Any], sort_keys: bool = True, indent: int = 2) -> str:
    """Convert JSON data to normalized string representation."""
    return json.dumps(data, sort_keys=sort_keys, indent=indent, ensure_ascii=False)

def get_json_paths(obj: Any, path: str = '') -> Dict[str, Any]:
    """Extract all key-value pairs with their JSON paths for detailed comparison."""
    paths = {}
    
    if isinstance(obj, dict):
        for key, value in obj.items():
            new_path = f"{path}.{key}" if path else key
            if isinstance(value, (dict, list)):
                paths.update(get_json_paths(value, new_path))
            else:
                paths[new_path] = value
    elif isinstance(obj, list):
        for i, value in enumerate(obj):
            new_path = f"{path}[{i}]"
            if isinstance(value, (dict, list)):
                paths.update(get_json_paths(value, new_path))
            else:
                paths[new_path] = value
    else:
        paths[path or 'root'] = obj
    
    return paths

def compare_json_structures(data1: Dict[str, Any], data2: Dict[str, Any]) -> List[str]:
    """Compare JSON structures and return list of differences."""
    paths1 = get_json_paths(data1)
    paths2 = get_json_paths(data2)
    
    differences = []
    all_paths = set(paths1.keys()) | set(paths2.keys())
    
    for path in sorted(all_paths):
        if path not in paths1:
            differences.append(f"+ {path}: {paths2[path]} (only in file2)")
        elif path not in paths2:
            differences.append(f"- {path}: {paths1[path]} (only in file1)")
        elif paths1[path] != paths2[path]:
            differences.append(f"~ {path}: {paths1[path]} -> {paths2[path]}")
    
    return differences

def unified_diff(text1: str, text2: str, filename1: str, filename2: str) -> List[str]:
    """Generate unified diff output."""
    lines1 = text1.splitlines(keepends=True)
    lines2 = text2.splitlines(keepends=True)
    
    diff = difflib.unified_diff(
        lines1, lines2,
        fromfile=filename1,
        tofile=filename2,
        lineterm=''
    )
    
    return list(diff)

def main():
    parser = argparse.ArgumentParser(
        description='Compare JSON files ignoring insignificant whitespace',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python json-diff.py file1.json file2.json
  python json-diff.py --no-sort file1.json file2.json
  python json-diff.py --structure-only file1.json file2.json
        """
    )
    
    parser.add_argument('file1', help='First JSON file to compare')
    parser.add_argument('file2', help='Second JSON file to compare')
    parser.add_argument('--no-sort', action='store_true',
                       help='Do not sort keys when normalizing JSON')
    parser.add_argument('--structure-only', action='store_true',
                       help='Show only structural differences (key-value changes)')
    parser.add_argument('--indent', type=int, default=2,
                       help='Indentation level for normalized JSON (default: 2)')
    
    args = parser.parse_args()
    
    # Load JSON files
    print(f"Comparing {args.file1} and {args.file2}...")
    data1 = load_json_file(args.file1)
    data2 = load_json_file(args.file2)
    
    # Quick check for identical content
    if data1 == data2:
        print("Files are semantically identical (no differences in JSON content)")
        return
    
    # Structure-only comparison
    if args.structure_only:
        differences = compare_json_structures(data1, data2)
        if differences:
            print("\nStructural differences:")
            for diff in differences:
                print(diff)
        else:
            print("No structural differences found")
        return
    
    # Normalize JSON for comparison
    sort_keys = not args.no_sort
    norm1 = normalize_json(data1, sort_keys=sort_keys, indent=args.indent)
    norm2 = normalize_json(data2, sort_keys=sort_keys, indent=args.indent)
    
    # Generate unified diff
    diff_lines = unified_diff(norm1, norm2, args.file1, args.file2)
    
    if not diff_lines:
        print("Files are semantically identical (no differences in JSON content)")
    else:
        print("\nUnified diff:")
        for line in diff_lines:
            print(line.rstrip())
        
        # Also show structural summary
        differences = compare_json_structures(data1, data2)
        if differences:
            print(f"\nSummary: {len(differences)} structural difference(s) found")
            print("Use --structure-only flag to see detailed structural changes")

if __name__ == '__main__':
    main()