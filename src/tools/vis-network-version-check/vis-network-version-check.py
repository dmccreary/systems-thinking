#!/usr/bin/env python3
"""
Vis-Network Version Checker and HTML Generator

This script checks the latest version of vis-network from npm registry
and generates the corresponding HTML head elements for including the library.
"""

import requests
import json
import sys
from typing import Optional, Dict, Any


def get_latest_version(package_name: str = "vis-network") -> Optional[str]:
    """
    Fetch the latest version of a package from npm registry.
    
    Args:
        package_name: The npm package name to check
        
    Returns:
        The latest version string, or None if there was an error
    """
    try:
        url = f"https://registry.npmjs.org/{package_name}/latest"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        return data.get('version')
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching version: {e}", file=sys.stderr)
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}", file=sys.stderr)
        return None


def generate_html_head(version: str, package_name: str = "vis-network") -> str:
    """
    Generate HTML head elements for including vis-network library.
    
    Args:
        version: The version string to use
        package_name: The npm package name
        
    Returns:
        Formatted HTML head elements as a string
    """
    html_template = f"""<head>
  <link rel="preconnect" href="https://unpkg.com" crossorigin>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/{package_name}@{version}/dist/{package_name}.min.css">
  <script src="https://unpkg.com/{package_name}/standalone/umd/{package_name}.min.js"></script>
</head>"""
    
    return html_template


def get_package_info(package_name: str = "vis-network") -> Optional[Dict[Any, Any]]:
    """
    Get detailed package information from npm registry.
    
    Args:
        package_name: The npm package name to check
        
    Returns:
        Package information dictionary, or None if there was an error
    """
    try:
        url = f"https://registry.npmjs.org/{package_name}/latest"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        return response.json()
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching package info: {e}", file=sys.stderr)
        return None


def main():
    """Main function to check version and generate HTML."""
    package_name = "vis-network"
    
    print(f"Checking latest version of {package_name}...")
    
    # Get the latest version
    latest_version = get_latest_version(package_name)
    
    if latest_version is None:
        print("Failed to retrieve version information.", file=sys.stderr)
        sys.exit(1)
    
    print(f"Latest {package_name} version: {latest_version}")
    print()
    
    # Generate HTML head elements
    html_head = generate_html_head(latest_version, package_name)
    
    print("Generated HTML head elements:")
    print("-" * 50)
    print(html_head)
    print("-" * 50)
    print()
    
    # Optional: Get additional package information
    package_info = get_package_info(package_name)
    if package_info:
        print("Additional package information:")
        print(f"  Description: {package_info.get('description', 'N/A')}")
        print(f"  Homepage: {package_info.get('homepage', 'N/A')}")
        print(f"  License: {package_info.get('license', 'N/A')}")
        print(f"  Last modified: {package_info.get('time', {}).get('modified', 'N/A')}")
    
    # Save to file option
    save_to_file = input("\nSave HTML head elements to file? (y/n): ").lower().strip()
    if save_to_file in ['y', 'yes']:
        filename = input("Enter filename (default: vis-network-head.html): ").strip()
        if not filename:
            filename = "vis-network-head.html"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(html_head)
            print(f"HTML head elements saved to {filename}")
        except IOError as e:
            print(f"Error saving file: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()