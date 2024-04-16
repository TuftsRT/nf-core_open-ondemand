#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# Load Anaconda module
module load anaconda/2021.11

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
                        echo "Usage: nf2ood.sh [input] [output]"
                        echo "This script performs some operations on the input and generates output."
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
        echo "Generating OOD app for $PIPELINE"
        # Copy nf-core_template to output folder
        cp -r "$parentfolder/nf-core_template" "$output/$PIPELINE"

        # Get the latest version of the pipeline
        latest_version=$(ls "$input/$PIPELINE" | tail -n 1)

        # Set input and output file paths
        inputJson="$input/$PIPELINE/$latest_version/$(echo "$latest_version" | tr '.' '_')/nextflow_schema.json"
        formYmlOut="$output/$PIPELINE/form.yml.erb"
        templateFile="$output/$PIPELINE/template.erb"
        paramsJsonOut="$output/$PIPELINE/template/nf-params.json.erb"

        # Generate string of versions
        string=$(ls -d "$input/$PIPELINE"/* | xargs -I {} basename {} | tr '\n' '%')

        # Run json2ood.py script
        python "$parentfolder/json2ood.py" "$inputJson" "$formYmlOut" "$templateFile" "$paramsJsonOut" "$string"

        # Replace placeholders in template files
        PIPELINE_SIMPLE=${PIPELINE##*-}
        sed -i -e 's/PIPELINE/'"$PIPELINE"'/g' "$output/$PIPELINE/submit.yml.erb"
        sed -i -e 's/PIPELINE/'"$PIPELINE_SIMPLE"'/g' "$output/$PIPELINE/manifest.yml"
        sed -i -e 's/PIPELINE/'"$PIPELINE"'/g' "$formYmlOut"
        sed -i -e '/- igenomes_base/d' "$formYmlOut"
        sed -i 's/value: True/value: true/g' "$formYmlOut"
        sed -i 's/value: False/value: false/g' "$formYmlOut"
        sed -i -e 's$<%= context.igenomes_base %>$/cluster/tufts/biocontainers/datasets/igenomes$' $paramsJsonOut

        if grep -q igenomes_ignore "$formYmlOut"; then
                # Remove existing igenomes_ignore and add it under genome
                sed -i -e '/- igenomes_ignore/d' "$formYmlOut"
                sed -i -e 's/- genome/- genome\n  - igenomes_ignore/' "$formYmlOut"
        fi

        # Remove template file
        rm "$templateFile"
done
