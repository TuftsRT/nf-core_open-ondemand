#! /bin/bash
#set -euo pipefail
set -x
IFS=$'\n\t'

generate_new_modulefile() {
    # generate_new_modulefile $APP $VERSION $LUA $TCLout
    # This is used to convert lua files developed by Purdue University to TCL modulefiles
    local app="$1"
    local version="$2"
    local tcl="$3"

cat <<EOF >>$tcl
#%Module -*- tcl -*-
# The MIT License (MIT)
# Copyright (c) 2024 Tufts University

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

module-whatis   nf-core $App pipeline
module-whatis   https://nf-co.re/$App
set pkg $app 
set ver $version
setenv NXF_SINGULARITY_CACHEDIR /cluster/tufts/biocontainers/nf-core/singularity-images

proc ModulesHelp { } {
  puts stderr "\tThis module adds $app v$version to the environment. "
}


#
# prepend-path 
#
prepend-path PATH            /cluster/tufts/biocontainers/tools/$app/$version/bin


#
# list conflict modules that cannot be loaded together
#
set conflicts_modules {$conflicts}
foreach a_conflict \$conflicts_modules {
  conflict $app
}

#
# appended log section
# 

if {[module-info mode "load"]} {
  global env
  if {[info exists env(USER)]} {
    set the_user [lindex [array get env USER] 1]
  } else {
    set the_user "foo"
  }
  system [concat "logger environment-modules" [module-info name] \$the_user ]
}

set additional_prereqs {"nf-core"}
if {[module-info mode "load"]} {
  foreach a_module \$additional_prereqs {
    if {![is-loaded \$a_module]} {
      module load \$a_module
    }
  }
}

EOF
}


generate_new_modulefile() {
    # generate_new_modulefile $PIPELINE $VERSION

    local uri="$1"
    local executable_dir=${PUBLIC_EXECUTABLE_DIR}
    local app=
    local ver=

    # Initialize description and homepage variables
    local homepage=""
    local description=""
    parse_home_description

    # Determine the registry and registry URL
    local registry=""
    local registry_url=""

    case "$uri" in
        *"biocontainers"*)
            registry="BioContainers"
            registry_url="https://biocontainers.pro/tools/$app"
            ;;
        *"quay.io"*)
            registry="Quay.io"
            registry_url="https://quay.io/repository/$app"
            ;;
        *"nvcr.io"*)
            registry="Nvidia NGC"
            registry_url="https://catalog.ngc.nvidia.com/containers"
            ;;
        *"gcr.io"*)
            registry="Google Container Registry"
            registry_url="$uri"
            ;;
        *)
            registry="DockerHub"
            docker_repo=$(echo "$uri" | sed 's|docker://\([^:]*\):.*|\1|')
            registry_url="https://hub.docker.com/r/${docker_repo}"
            ;;
    esac

    # Ensure template file exists
    local template_file="${TEMPLATE_DIR}/module_template.lua"
    if [[ ! -f "$template_file" ]]; then
        echo "Error: Template file '$template_file' not found."
        return 1
    fi

    # Substitute placeholders in the template
    local modulefile_content=$(sed -e "s|\${DESCRIPTION}|$description|g" \
                                   -e "s|\${REGISTRY}|$registry|g" \
                                   -e "s|\${REGISTRY_URL}|$registry_url|g" \
                                   -e "s|\${HOMEPAGE}|$homepage|g" \
                                   -e "s|\${IMAGE}|$image|g" \
                                   -e "s|\${URI}|$uri|g" \
                                   -e "s|\${VERSION}|$ver|g" \
                                   -e "s|\${EXECUTABLE_DIR}|$executable_dir|g" \
                                   -e "s|\${APP}|$app|g" \
                                   "$template_file")

    # Output the generated modulefile
    echo "$modulefile_content"
    return $MODTYPE_NEW
}

# ----------------------------------------------------------------------
# Function generate_executable definition
# ----------------------------------------------------------------------

generate_executable() {
      # This is used to convert bash wrappers for commands provided by applications.
      # generate_executable $APP $VERSION $PROGRAM $LUA
      local app=$1
      local version=$2
      local executable=$3

cat <<EOF >>$executable
#!/usr/bin/env bash

if [ ! \$(command -v singularity) ]; then
        module load singularity
fi

VER=$version
PKG=$app

export NXF_SINGULARITY_CACHEDIR=/cluster/tufts/biocontainers/nf-core/singularity-images
nextflow run /cluster/tufts/biocontainers/nf-core/pipelines/$app/$version/$(echo "$version" | tr '.' '_') "\$@"
EOF

      chmod +x $executable
}


# ----------------------------------------------------------------------
# Main logic
# ----------------------------------------------------------------------
parentfolder=$(git rev-parse --show-toplevel)
input=""
output=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -i|--input)
            input=$2
            shift 2
            ;;
        -o|--output)
            output=$2
            shift 2
            ;;
        -h|--help)
            echo "Usage: tcl_modulegenerator.sh [input] [output]"
            echo "This script generate tcl environment modules for nf-core pipelines"
            echo "Arguments:"
            echo "  input   - The input parameter"
            echo "  output  - The output parameter"
            exit 0
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done

# Remove existing output folder if it exists
if [ -d "$output" ]; then
    echo "The output folder already exists. Do you want to continue and delete it? (y/n)"
    read answer
    if [ "$answer" == "y" ]; then
        echo "Deleting the output folder..."
        rm -r "$output"
        mkdir -p "$output"
    else
        echo "Will use the existing output folder."
    fi
else
    mkdir -p "$output"
fi
# Get list of pipelines in the input folder
pipelines=$(ls "$input")
for PIPELINE in $pipelines; do
    echo "Generating tcl modulefiles for $PIPELINE"
    ## generate arrary of versions
    VersionArray=$(\ls -1 $input/$PIPELINE/)
    for version in $VersionArray
    do 
        App=${PIPELINE##*-}
        VERSION=$(basename $version)
        TCLout="$output/tcls/$PIPELINE/$VERSION"
        AppToolout="$output/tools/$PIPELINE/$VERSION/bin/$App"
        mkdir -p $output/tcls/$PIPELINE
        mkdir -p $output/tools/$PIPELINE/$VERSION/bin/
        touch $TCLout
        generate_new_modulefile $PIPELINE $VERSION $TCLout
        generate_executable $PIPELINE $VERSION $AppToolout
    done
done