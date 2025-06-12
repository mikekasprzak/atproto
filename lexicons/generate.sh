#!/bin/bash

output_dir="../dist/lexicons"

# get a recursive list of all files
files=$(find . -type f)

# create the dist/lexicons output directory
mkdir -p $output_dir

# recursively convert all jsonc files with the .jsonld.jsonc or .jsonc extension to json, place them in $output_dir, then remove them from the list
for file in $files; do
    echo "Converting $file to json"
    if [[ "$file" == *.jsonld.jsonc ]]; then
        # drop the .jsonc extension
        pnpm exec jsonc-parser $file > $output_dir/${file%.jsonc}
    elif [[ "$file" == *.jsonc ]]; then
        # replace the .jsonc extension with .json
        pnpm exec jsonc-parser $file > $output_dir/${file%.jsonc}.json
    fi
    files=$(echo "$files" | grep -v "$file")
done

# recursively convert all .jsonld.json files to json, and place them in ../dist/lexicons
for file in $(find . -type f -name "*.jsonld.json"); do
    echo "Converting $file to json"
    pnpm exec jsonld -i $file -o ../dist/lexicons/${file%.jsonld.json}.json
done

# recursively copy all .json files to ../dist/lexicons
for file in $(find . -type f -name "*.json"); do
    echo "Copying $file to ../dist/lexicons"
    cp $file ../dist/lexicons
done

# recursively convert all .jsonld.json files in ../dist/lexicons to json
for file in $(find ../dist/lexicons -type f -name "*.jsonld.json"); do
    echo "Converting $file to json"
    pnpm exec jsonld -i $file -o ${file%.jsonld.json}.json
done
