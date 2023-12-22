#!/bin/bash

src_dir="./"
dest_dir="./src/"
ignore_dir="./node_modules/"

find "$src_dir" -name "*.ts" -not -path "$ignore_dir/*" -print0 | while IFS= read -r -d '' file; do
    dest_file="$dest_dir/${file#$src_dir/}"
    dest_dirname=$(dirname "$dest_file")
    mkdir -p "$dest_dirname"
    mv "$file" "$dest_file"
done