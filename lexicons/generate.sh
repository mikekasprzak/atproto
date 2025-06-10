#!/bin/bash

# recursively convert all jsonc files to json, and place them in ../dist/lexicons
mkdir -p ../dist/lexicons
for file in $(find . -type f -name "*.jsonc"); do
    echo "Converting $file to json"
    pnpm exec jsonc-parser $file > ../dist/lexicons/${file%.jsonc}.json
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
