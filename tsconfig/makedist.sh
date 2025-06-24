#!/bin/bash
OUT=dist

# if directory is specified as first argument, use it instead of default 'dist'
if [ -n "$1" ]; then
  OUT=$1
fi

mkdir -p $OUT/cjs
echo '{"type": "commonjs"}' > $OUT/cjs/package.json
mkdir -p $OUT/esm
echo '{"type": "module"}' > $OUT/esm/package.json
