#!/bin/bash

usage() {
    echo "Usage: $0 [-chVq] <output_dir> <input_dir>"
    echo "  <output_dir>: the directory to output the processed files to"
    echo "  <input_dir>: the directory to process the files from, defaults to the current directory"
    echo "  -c, --clean: remove the output directory"
    echo "  -h, --help: print this help message and exit"
    echo "  -V, --verbose: print verbose output"
    echo "  -q, --quiet: print only errors and warnings"
    exit 0
}

# if no arguments are provided, print the help message
if [ $# -eq 0 ]; then
    usage
fi

# set the default values
clean=false
verbose=false
quiet=false

# parse the arguments
while getopts "chVq" opt; do
    case $opt in
        c|clean) clean=true ;;
        h|help) usage ;;
        V|verbose) verbose=true ;;
        q|quiet) quiet=true ;;
    esac
done
shift "$((OPTIND-1))"

# if there are less than 2 arguments, print the help message
if [ $# -lt 2 ]; then
    >&2 echo "$0: Not enough arguments"
    usage
fi

# if $2 doesn't exist, print an error message and exit
if [ ! -d "$2" ]; then
    >&2 echo "$0: $2: No such directory"
    exit 1
fi

# if $2 is a file, print an error message and exit
if [ -f "$2" ]; then
    >&2 echo "$0: $2: Is a file, not a directory"
    exit 1
fi

# if $1 is a file, print an error message and exit
if [ -f "$1" ]; then
    >&2 echo "$0: $1: Is a file, not a directory"
    exit 1
fi

# if $1 and $2 are the same, print an error message and exit
if [ "$1" == "$2" ]; then
    >&2 echo "$0: $1 and $2 are the same directory"
    exit 1
fi

if [ "$verbose" == true ] && [ "$quiet" != true ]; then
    echo "Args: $*"
fi

# get the current directory
pwd=`pwd`

# get the input and output directories, relative to the current directory
input_dir=`realpath -m --relative-to=$pwd $2`
output_dir=`realpath -m --relative-to=$pwd $1`

if [ "$verbose" == true ] && [ "$quiet" != true ]; then
    echo "Input directory: $input_dir (`realpath -m $input_dir`)"
    echo "Output directory: $output_dir (`realpath -m $output_dir`)"
fi

# find all files in the input directory and store them in an array
in_files=($(find $input_dir -type f))

# if clean is true, remove the output directory
if [ "$clean" == true ]; then
    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Removing $output_dir"
    fi
    # remove the output directory
    rm -rf $output_dir

    # clear the output files array
    out_files=()
else
    # find all files in the output directory and store them in an array
    out_files=($(find $output_dir -type f))
fi

# first pass, find all of the files that need to be converted or copied to $output_dir
for file in "${in_files[@]}"; do
    # skip .schema.json files
    if [[ "$file" == *.schema.json ]]; then
        skipped_in_files="$skipped_in_files ${file}"
    # use .json files
    elif [[ "$file" == *.json ]]; then
        # if a destination file exists and has a newer timestamp, add it to the omitted list
        if [ $output_dir/${file} -nt $file ]; then
            omitted_in_files="$omitted_in_files ${file}"
            continue
        fi
        # add to the list of selected input files
        selected_in_files="$selected_in_files ${file}"
     # use .jsonc files
    elif [[ "$file" == *.jsonc ]]; then
        # if a destination file with a .json extension exists and has a newer timestamp, add it to the omitted list
        if [ $output_dir/${file%.jsonc}.json -nt $file ]; then
            omitted_in_files="$omitted_in_files ${file}"
            continue
        fi
        # add to the list of selected input files
        selected_in_files="$selected_in_files ${file}"
    else
        # add to the list of ignored input files
        ignored_in_files="$ignored_in_files ${file}"
    fi
done

# convert the the input file lists to arrays
selected_in_files=($selected_in_files)
skipped_in_files=($skipped_in_files)
omitted_in_files=($omitted_in_files)
ignored_in_files=($ignored_in_files)

if [ "$verbose" == true ] && [ "$quiet" != true ]; then
    echo "Selected input files: ${selected_in_files[@]}"
    echo "Skipped input files: ${skipped_in_files[@]}"
    echo "Omitted input files: ${omitted_in_files[@]}"
    echo "Ignored input files: ${ignored_in_files[@]}"
fi

# if input files were selected, get all the directories, sorting them by depth
if [[ -n "${selected_in_files[@]}" ]]; then
    selected_in_dirs=($(dirname ${selected_in_files[@]} | sort | uniq | sort -r))

    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Selected input directories: ${selected_in_dirs[@]}"
    fi
fi

# create the output directories if any were found
if [[ -n "${selected_in_dirs[@]}" ]]; then
    selected_out_dirs=()
    for dir in "${selected_in_dirs[@]}"; do
        selected_out_dirs+=("$output_dir/$dir")
    done

    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Creating output directories: ${selected_out_dirs[@]}"
    fi

    mkdir -p ${selected_out_dirs[@]}
fi

# second pass, convert or copy the files to $output_dir
for file in "${selected_in_files[@]}"; do
    # convert .jsonc files and place them in their new directory under $output_dir
    if [[ "$file" == *.jsonc ]]; then
        path="$output_dir/${file%.jsonc}.json"
        if [ "$quiet" != true ]; then
            echo "Converting `basename $file` to json and placing it in $path"
        fi
        pnpm exec jsonc-parser $file > $path
    # copy .json files to their new directory under $output_dir
    elif [[ "$file" == *.json ]]; then
        path="$output_dir/${file}"
        if [ "$quiet" != true ]; then
            echo "Copying `basename $file` to $path"
        fi
        cp $file $path
    fi
done

# in this rare case, we want to print if verbose OR not quiet. That way we can print only the changes with -qV
if [ "$verbose" == true ] || [ "$quiet" != true ]; then
    echo "Finished generating \"$output_dir\". ${#selected_in_files[@]} file(s) changed."
fi
