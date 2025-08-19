#!/usr/bin/env python3
"""
CLD JSON Validator

Validates Causal Loop Diagram JSON files against the CLD schema.
Looks for files ending with *cld.json in the current directory or validates a specific file.
"""

import json
import sys
import os
import glob
import argparse
from pathlib import Path
from jsonschema import validate, ValidationError, Draft7Validator
from jsonschema.exceptions import SchemaError


def load_schema():
    """Load the CLD schema from ~/.schemas/cld-schema.json"""
    schema_path = Path.home() / ".schemas" / "cld-schema.json"
    
    if not schema_path.exists():
        print(f"Error: Schema file not found at {schema_path}")
        sys.exit(1)
    
    try:
        with open(schema_path, 'r', encoding='utf-8') as f:
            schema = json.load(f)
        return schema
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in schema file: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error loading schema: {e}")
        sys.exit(1)


def find_cld_files():
    """Find all files ending with *cld.json in the current directory"""
    pattern = "*cld.json"
    files = glob.glob(pattern)
    return files


def validate_json_file(file_path, schema):
    """Validate a single JSON file against the schema"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        return f"Invalid JSON in {file_path}: {e}"
    except FileNotFoundError:
        return f"File not found: {file_path}"
    except Exception as e:
        return f"Error reading {file_path}: {e}"
    
    try:
        # Create validator to get detailed error messages
        validator = Draft7Validator(schema)
        errors = list(validator.iter_errors(data))
        
        if not errors:
            return "valid"
        else:
            error_messages = []
            for error in errors:
                # Create a more readable error message
                path = " -> ".join(str(p) for p in error.absolute_path) if error.absolute_path else "root"
                error_messages.append(f"  Path: {path}\n    Error: {error.message}")
            
            return f"Validation errors in {file_path}:\n" + "\n".join(error_messages)
    
    except SchemaError as e:
        return f"Schema error: {e}"
    except Exception as e:
        return f"Validation error: {e}"


def main():
    parser = argparse.ArgumentParser(
        description="Validate CLD JSON files against the CLD schema",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                           # Validate all *cld.json files in current directory
  %(prog)s my-diagram-cld.json       # Validate specific file
  %(prog)s *.json                    # Validate multiple files
        """
    )
    parser.add_argument(
        'files', 
        nargs='*', 
        help='CLD JSON file(s) to validate. If not specified, validates all *cld.json files in current directory.'
    )
    
    args = parser.parse_args()
    
    # Load the schema
    schema = load_schema()
    
    # Determine which files to validate
    if args.files:
        files_to_validate = []
        for file_pattern in args.files:
            if '*' in file_pattern or '?' in file_pattern:
                # Handle glob patterns
                matched_files = glob.glob(file_pattern)
                if not matched_files:
                    print(f"No files found matching pattern: {file_pattern}")
                    continue
                files_to_validate.extend(matched_files)
            else:
                # Direct file path
                files_to_validate.append(file_pattern)
    else:
        # Find all *cld.json files in current directory
        files_to_validate = find_cld_files()
        if not files_to_validate:
            print("No *cld.json files found in current directory")
            sys.exit(1)
    
    # Validate each file
    all_valid = True
    for file_path in files_to_validate:
        result = validate_json_file(file_path, schema)
        
        if result == "valid":
            if len(files_to_validate) > 1:
                print(f"{file_path}: valid")
            else:
                print("valid")
        else:
            all_valid = False
            if len(files_to_validate) > 1:
                print(f"{file_path}: INVALID")
                print(result)
                print("-" * 50)
            else:
                print(result)
    
    # Exit with error code if any files were invalid
    if not all_valid:
        sys.exit(1)


if __name__ == "__main__":
    main()
