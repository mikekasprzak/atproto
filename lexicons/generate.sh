#!/bin/bash
set -ue

usage() {
    echo "Usage: $0 [-cVq] [--no-lock|--lockfile <lockfile>] <output_dir> <input_dir>"
    echo "  <output_dir>: the directory to output the processed files to"
    echo "  <input_dir>: the directory to process the files from, defaults to the current directory"
    echo "  -c, --clean: remove the output directory"
    echo "  -V, --verbose: print verbose output"
    echo "  -q, --quiet: print only errors and warnings"
    echo "      --no-lock: do not use file locking"
    echo "      --lockfile: the lockfile to use. Default: /tmp/`basename $0`.lock"
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
useFlock=true
lockfile="/tmp/`basename $0`.lock"

# parse the arguments
while getopts "cVq" opt; do
    case $opt in
        c|clean) clean=true ;;
        V|verbose) verbose=true ;;
        q|quiet) quiet=true ;;
        no-lock) useFlock=false ;;
        lockfile) lockfile="$2"; useFlock=true ;;
        *) usage ;;
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

# use flock to limit concurrent runs of this script
if [[ "$useFlock" != false ]]; then
    exec {fd}<>$lockfile
    flock -F -w 15 $fd || {
        >&2 echo "Failed to lock $lockfile ($fd)"
        exit 1
    }

    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Locking $lockfile ($fd)"
    fi
fi

# get the current directory
pwd=$(pwd)

# get the input and output directories, relative to the current directory
input_dir=$(realpath -m --relative-to=$pwd $2)
output_dir=$(realpath -m --relative-to=$pwd $1)

if [ "$verbose" == true ] && [ "$quiet" != true ]; then
    echo "Current working directory: $pwd"
    echo "Input directory: $input_dir"
    echo "Output directory: $output_dir"
    echo "Args: $*"
fi

# find all files in the input directory and store them in an array
in_files=($(find $input_dir -type f))

out_files=()

if [ "$clean" == true ]; then
    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Removing $output_dir"
    fi
    rm -rf $output_dir
elif [[ -d "$output_dir" ]]; then
    # find all files in the output directory and store them in an array
    out_files=($(find $output_dir -type f))
fi

selected_in_files=
ignored_in_files=
skipped_in_files=
omitted_in_files=
selected_out_files=

# first pass, find all of the files that need to be converted or copied to $output_dir
for file in "${in_files[@]}"; do
    # skip .schema.json files
    if [[ "$file" == *.schema.json ]]; then
        skipped_in_files="$skipped_in_files ${file}"
    # keep file extensions
    elif [[ "$file" == *.json ]]; then
        out_file="$output_dir/${file#$input_dir/}"
        # if a destination file exists and has a newer timestamp, add it to the omitted list
        if [[ -f "$out_file" ]] && [[ "$out_file" -nt "$file" ]]; then
            omitted_in_files="$omitted_in_files ${file}"
            continue
        fi
        # add to the list of selected input files
        selected_in_files="$selected_in_files ${file}"
        selected_out_files="$selected_out_files ${out_file}"
    # .jsonc files become .json files
    elif [[ "$file" == *.jsonc ]]; then
        out_file="$output_dir/${file#$input_dir/%.jsonc}.json"
        # if a destination file with a .json extension exists and has a newer timestamp, add it to the omitted list
        if [[ -f "$out_file" ]] && [[ "$out_file" -nt "$file" ]]; then
            omitted_in_files="$omitted_in_files ${file}"
            continue
        fi
        # add to the list of selected input files
        selected_in_files="$selected_in_files ${file}"
        selected_out_files="$selected_out_files ${out_file}"
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
selected_out_files=($selected_out_files)

if [ "$verbose" == true ] && [ "$quiet" != true ]; then
    echo "Selected input files: ${selected_in_files[@]}"
    echo "Skipped input files: ${skipped_in_files[@]}"
    echo "Omitted input files: ${omitted_in_files[@]}"
    echo "Ignored input files: ${ignored_in_files[@]}"
    echo "Selected output files: ${selected_out_files[@]}"
fi

# if input files were selected, get all the directories, sorting them by depth
if [[ -n "${selected_out_files[@]}" ]]; then
    selected_out_dirs=($(dirname ${selected_out_files[@]} | sort | uniq | sort -r))

    if [ "$verbose" == true ] && [ "$quiet" != true ]; then
        echo "Creating output directories: ${selected_out_dirs[@]}"
    fi

    mkdir -p ${selected_out_dirs[@]}
fi

# second pass, convert or copy the files to $output_dir
for file in "${selected_in_files[@]}"; do
    # copy files to their new directory under $output_dir
    if [[ "$file" == *.json ]]; then
        out_file="$output_dir/${file#$input_dir/}"
        # if not quiet, print the file being copied
        if [ "$quiet" != true ]; then
            echo "Copying `basename $file` to $out_file"
        fi
        cp $file $out_file
    # convert .jsonc files, rename them to .json, and place them in their new directory under $output_dir
    elif [[ "$file" == *.jsonc ]]; then
        out_file="$output_dir/${file#$input_dir/%.jsonc}.json"
        # if not quiet, print the file being converted
        if [ "$quiet" != true ]; then
            echo "Converting `basename $file` to json and placing it in $out_file"
        fi
        pnpm exec jsonc-parser $file > $out_file
    fi
done

# in this rare case, we want to print if verbose OR not quiet. That way we can print only the changes with -qV
if [ "$verbose" == true ] || [ "$quiet" != true ]; then
    # the total number of files are the sum of the selected and omitted files
    total_files=(${selected_in_files[@]} ${omitted_in_files[@]})
    echo "Finished generating $output_dir. ${#selected_in_files[@]} of ${#total_files[@]} file(s) changed."
fi
