#!/usr/bin/env python

import json
import shutil
import os
import sys
import re

hidden_list=["report_file", "citations_file","css_file", "logo_file", "report_template","report_logo", "report_css"]
number_field_list=[]
boolean_field_list=[]

# Function to write options in the outfile
def write_options(outfile, options):
    for option in options:
        if option:
            outfile.write(f"      - ['{option}', '{option}']\n")

# Function to write widget in the outfile
def write_widget(outfile, widget):
    if widget:
        if widget != 'check_box' and widget != 'check_box_default':
            outfile.write(f"    widget: {widget}\n")
        if widget == 'check_box':
            outfile.write(f"    widget: select\n")
            outfile.write("    options:\n")
            outfile.write("      - ['false', 'false']\n")
            outfile.write("      - ['true', 'true']\n")

# Function to replace ' and " in help with `, but exclude ' in words like you're or it's.
def replace_apostrophes(text):
    # Regular expression pattern to match apostrophes that are not preceded or followed by letters
    pattern = r"(?<![a-zA-Z])'|'(?![a-zA-Z])"
    # Replace apostrophes with `
    replaced_text = re.sub(pattern, "`", text)
    return replaced_text.replace('"', '`')

# Function to write help text in the outfile
def write_help(outfile, help_text):
    if help_text:
        help_text_replaced=replace_apostrophes(help_text)
        outfile.write(f"    help: \"{help_text_replaced}\"\n")


# Function to process genome data
def process_genome(outfile):
    outfile.write("  genome:\n")
    outfile.write("    label: iGenomes\n")
    outfile.write("    widget: select\n")
    outfile.write("    required: false\n")
    outfile.write("    options:\n")
    outfile.write("      - ['None', ' ']\n")
    genomes = ['GRCh37', 'GRCh38', 'GRCm38', 'TAIR10', 'EB2', 'UMD3.1', 'WBcel235', 'CanFam3.1', 'GRCz10', 'BDGP6', 'EquCab2', 'EB1', 'Galgal4', 'Gm01', 'Mmul_1', 'IRGSP-1.0', 'CHIMP2.1.4', 'Rnor_5.0', 'Rnor_6.0', 'R64-1-1', 'EF2', 'Sbi1', 'Sscrofa10.2', 'AGPv3', 'hg38', 'hg19', 'mm10', 'bosTau8', 'ce10', 'canFam3', 'danRer10', 'dm6', 'equCab2', 'galGal4', 'panTro4', 'rn6', 'sacCer3', 'susScr3']
    write_options(outfile, genomes)
 #   outfile.write("    help: \"If genome is selected (e.g. GRCh37) then the FASTA and GTF files (and existing indices) obtained from [AWS-iGenomes](https://ewels.github.io/AWS-iGenomes/) will be automatically used. However, this method is `not recommended`, because Gene annotations in iGenomes are extremely out of date.\"\n\n")

# Function to process properties
def process_properties(outfile, properties):
    """
    Process the properties dictionary and write the corresponding YAML content to the output file.

    Args:
        outfile (file): The output file object.
        properties (dict): The properties dictionary.

    Returns:
        None
    """
    for key, value in properties.items():
        help=""
        if key == 'genome':
            if 'hidden' in value and value['hidden'] == True:
                hidden_list.append(key)
                continue
            else: 
                process_genome(outfile)
                help=value["description"]
                write_help(outfile, help)
        elif key not in ['email', 'igenomes_ignore']:
            if 'hidden' in value and value['hidden'] == True:
                hidden_list.append(key)
                continue
            else:
                outfile.write(f"  {key}:\n")
                if 'required' in properties and key in properties['required']:
                    outfile.write("    required: true\n")
                widget = None
                for k, v in value.items():
                    if k == 'type':
                        widget = str(v)
                        if widget == 'boolean':
                            widget = "check_box"
                            boolean_field_list.append(key)
                        elif widget == 'string':
                            widget = "text_field"
                        elif widget in ['integer', 'number']:
                            widget = "text_field"
                            number_field_list.append(key)
                    elif k == 'enum':
                        if widget == 'text_field':
                            widget = "select"
                        outfile.write("    widget: " + widget + "\n")
                        widget = None
                        outfile.write("    options:\n")
                        if 'default' not in value:
                            outfile.write("      - ['None', ' ']\n")
                        write_options(outfile, v)
                    elif k == 'default' and widget == "check_box":
                            widget = "check_box_default"
                            outfile.write(f"    widget: select\n")
                            outfile.write("    options:\n")
                            if str(v).lower() == 'true':
                                outfile.write("      - ['true', 'true']\n")
                                outfile.write("      - ['false', 'false']\n")
                            elif str(v).lower() == 'false':
                                outfile.write("      - ['false', 'false']\n")
                                outfile.write("      - ['true', 'true']\n")
                    elif k == 'default' and widget != "number_field" and widget != "check_box":
                        if v is None:
                            outfile.write("    value: "  + "null"  + "\n")
                        else:
                            outfile.write("    value: " + "\""  + str(v) + "\""  + "\n")
                    elif k == 'default' and widget == "number_field":
                        outfile.write("    value: "  + str(v)  + "\n")            
                    elif k == 'description':
                        help=str(v)
                outfile.write(f"    label: {key}\n")                
                write_widget(outfile, widget)
                write_help(outfile, help)
                outfile.write("\n")



# Check if the path exists
if not os.path.exists(sys.argv[1]):
    print()
    print("Path does not exist: " + sys.argv[1])
    print()
    sys.exit()

# Remove the existing file if it exists
if os.path.exists(sys.argv[2]):
    os.remove(sys.argv[2])

# Copy the source file to the destination file
shutil.copyfile(sys.argv[3], sys.argv[2])

# Open the formYmlOut in append mode
formYmlOut = open(sys.argv[2], "a")

# Split the versions by '%'
versions = sys.argv[5].split('%')
versions.sort(reverse=True)

# Write the versions in the formYmlOut
formYmlOut.write("\n  version:\n    label: Version\n    widget: select\n    options:")
for version in versions:
    if version:
        new_version = version.replace(".", "_")
        formYmlOut.write(f"\n      - ['{version}', '/cluster/tufts/biocontainers/nf-core/pipelines/PIPELINE/{version}/{new_version}']")

# Open the schema.jsonInput file
schemaJson = open(sys.argv[1])
data = json.load(schemaJson)

formYmlOut.write("\n\n")
for i in data['definitions']:
    if i != 'institutional_config_options' and i != 'generic_options' and i != 'max_job_request_options':
        name = i
        for j in data['definitions'][name]:
            requiredBool = False
            if j == 'required':
                requiredBool = True
                required_properties = data['definitions'][name][j]
            if j == 'properties':
                process_properties(formYmlOut, data['definitions'][name][j])

# Open the second paramsJsonOut in write mode
paramsJsonOut = open(sys.argv[4], "w")

# Write the form fields in the formYmlOut
formYmlOut.write("\nform:\n")
formYmlOut.write("  - bc_num_hours\n")
formYmlOut.write("  - cpu_partition\n")
formYmlOut.write("  - reservation\n")
formYmlOut.write("  - version\n")
formYmlOut.write("  - workdir\n")
formYmlOut.write("  - outdir\n")

# Write the context variables in the second paramsJsonOut
paramsJsonOut.write("{\n")
paramsJsonOut.write("""    "outdir":"<%= context.outdir %>\"\n""")
for i in data['definitions']:
    if i != 'institutional_config_options' and i != 'generic_options' and i != 'max_job_request_options':
        name = i
        for k in data['definitions'][name]['properties']:
            if k != 'email' and k != 'outdir' and k != 'igenomes_ignore' and k not in hidden_list and k not in number_field_list and k not in boolean_field_list:
                formYmlOut.write("  - " + k + "\n")
                paramsJsonOut.write(",\n    \"" + k + "\": \"<%= context." + k + " %>\"")
            elif k in number_field_list or k in boolean_field_list:
                formYmlOut.write("  - " + k + "\n")
                paramsJsonOut.write(",\n    \"" + k + "\": <%= context." + k + " %>")

formYmlOut.write("  - TOWER_ACCESS_TOKEN\n")
formYmlOut.write("  - resume\n")
paramsJsonOut.write("\n}")
paramsJsonOut.close()
schemaJson.close()
formYmlOut.close()
