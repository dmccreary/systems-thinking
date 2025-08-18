#!/bin/bash

# extract-system-structure.sh
# Extracts "The System Structure" content from Fixes that Fail archetype markdown files
# and outputs to cld-input.json

# Set the directory containing the markdown files
ARCHETYPES_DIR="../../docs/archetypes/fixes-that-fail"
OUTPUT_FILE="cld-input.json"

# Initialize JSON output
echo "{" > "$OUTPUT_FILE"
echo '  "archetypes": [' >> "$OUTPUT_FILE"

# Flag to track if we need to add commas between entries
first_entry=true

# Process each markdown file in the fixes-that-fail directory
for file in "$ARCHETYPES_DIR"/*.md; do
    # Skip index.md as it's likely not an archetype
    if [[ "$(basename "$file")" == "index.md" ]]; then
        continue
    fi
    
    # Extract filename without path and extension for the title
    filename=$(basename "$file" .md)
    
    # Extract content between "## The System Structure" and the next "##" header
    system_structure=$(awk '
        /^## The System Structure$/ { 
            found=1; 
            next 
        }
        found && /^##/ { 
            found=0 
        }
        found && !/^## The System Structure$/ { 
            if (NF > 0) print $0 
        }
    ' "$file" | sed 's/"/\\"/g' | tr '\n' ' ' | sed 's/  */ /g' | sed 's/^ *//' | sed 's/ *$//')
    
    # Only add entry if we found system structure content
    if [[ -n "$system_structure" ]]; then
        # Add comma if not the first entry
        if [[ "$first_entry" == "false" ]]; then
            echo "    ," >> "$OUTPUT_FILE"
        fi
        first_entry=false
        
        # Add the JSON entry
        echo "    {" >> "$OUTPUT_FILE"
        echo "      \"filename\": \"$filename\"," >> "$OUTPUT_FILE"
        echo "      \"title\": \"$(echo "$filename" | sed 's/-/ /g' | sed 's/\b\w/\u&/g')\"," >> "$OUTPUT_FILE"
        echo "      \"system_structure\": \"$system_structure\"" >> "$OUTPUT_FILE"
        echo -n "    }" >> "$OUTPUT_FILE"
    fi
done

# Close JSON structure
echo "" >> "$OUTPUT_FILE"
echo '  ]' >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

echo "Extraction complete. Output saved to $OUTPUT_FILE"
echo "Processed files in $ARCHETYPES_DIR"