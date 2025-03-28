#!/usr/bin/env python

import json
import shutil
import os
import sys
import re

# Lists to store field information
hidden_list = ["report_file", "citations_file", "css_file", "logo_file", "report_template", "report_logo", "report_css"]
number_field_list = []
boolean_field_list = []

# Function to check if a file exists
def check_file_exists(filepath):
    if not os.path.exists(filepath):
        print(f"\nError: File not found: {filepath}\n")
        sys.exit(1)

# Function to write options in the outfile
def write_options(outfile, options):
    for option in options:
        if option:  # Ensure option is not empty or None
            outfile.write(f"      - ['{option}', '{option}']\n")

# Function to generate top-level options for checkboxes
def generate_parent_options(name, definition):
    output_lines = []
    label = definition.get("title", name.replace("_", " ").title())
    properties = definition.get("properties", {})
    help_text = definition.get("description", "")  # Extract top-level description

    output_lines.append(f"  {name}:")
    output_lines.append(f"    label: {label}")
    output_lines.append(f"    widget: 'check_box'")
    output_lines.append(f"    html_options:")
    output_lines.append(f"      data:")

    for prop in properties:
        if prop == "email":  # Skip 'email' key
            continue
        output_lines.append(f"        hide-{prop}-when-un-checked: true")

    if help_text:
        output_lines.append(f"    help: \"{replace_apostrophes(help_text)}\"")

    output_lines.append("")  # Add a newline for separation
    return "\n".join(output_lines)

# Function to write widget in the outfile
def write_widget(outfile, widget, value):
    if not widget:
        return

    default_value = value.get("default", "")

    if widget == "check_box":
        outfile.write("    widget: select\n")
        outfile.write("    options:\n")
        outfile.write("      - ['false', 'false']\n")
        outfile.write("      - ['true', 'true']\n")

    elif widget == "text_field":
        outfile.write("    widget: text_field\n")
        if default_value:
            outfile.write(f"    value: \"{default_value}\"\n")  # Enclose in quotes for safety

    elif widget == "path_selector":
        outfile.write("    widget: path_selector\n")
        outfile.write("    directory: /cluster/tufts\n")
        outfile.write("    favorites:\n")
        outfile.write("      - /cluster/tufts\n")
        outfile.write("      - /cluster/home \n")

    elif widget == "number_field":
        outfile.write("    widget: number_field\n")
        if isinstance(default_value, (int, float)):
            outfile.write(f"    value: {default_value}\n")
        outfile.write("    step: 1\n")

    elif widget == "select":
        outfile.write("    widget: select\n")
        outfile.write("    options:\n")

        # Extract enum values
        enum_values = value.get("enum", [])
        default_value = value.get("default", None)

        # Ensure default value appears first
        if default_value and default_value in enum_values:
            outfile.write(f"      - ['{default_value}', '{default_value}']\n")
            enum_values.remove(default_value)  # Remove from list to prevent duplicate

        # Write remaining enum options
        for option in enum_values:
            outfile.write(f"      - ['{option}', '{option}']\n")

# Function to replace ' and " in help with `, but exclude ' in words like you're or it's.
def replace_apostrophes(text):
    # Regular expression pattern to match apostrophes that are not preceded or followed by letters
    pattern = r"(?<![a-zA-Z])'|'(?![a-zA-Z])"
    # Replace apostrophes with `
    replaced_text = re.sub(pattern, "`", text)
    return replaced_text.replace('"', '`')

# Function to write help text
def write_help(outfile, help_text):
    if help_text:
        outfile.write(f"    help: \"{replace_apostrophes(help_text)}\"\n")


# Function to process igenome
def process_genome(outfile):
    outfile.write("  genome:\n")
    outfile.write("    label: iGenomes\n")
    outfile.write("    widget: select\n")
    outfile.write("    required: false\n")
    outfile.write("    options:\n")
    outfile.write("      - ['None', ' ']\n")
    genomes = ['GRCh37', 'GRCh38', 'GRCm38', 'TAIR10', 'EB2', 'UMD3.1', 'WBcel235', 'CanFam3.1', 'GRCz10', 'BDGP6', 'EquCab2', 'EB1', 'Galgal4', 'Gm01', 'Mmul_1', 'IRGSP-1.0', 'CHIMP2.1.4', 'Rnor_5.0', 'Rnor_6.0', 'R64-1-1', 'EF2', 'Sbi1', 'Sscrofa10.2', 'AGPv3', 'hg38', 'hg19', 'mm10', 'bosTau8', 'ce10', 'canFam3', 'danRer10', 'dm6', 'equCab2', 'galGal4', 'panTro4', 'rn6', 'sacCer3', 'susScr3']
    write_options(outfile, genomes)


# Function to process properties
def process_properties(outfile, properties):
    for key, value in properties.items():
        if key in ['email', 'igenomes_ignore']:
            continue

        if value.get("hidden", False):
            hidden_list.append(key)
            continue

        if key == "genome":
            process_genome(outfile)
            write_help(outfile, value.get("description", ""))
            outfile.write("\n")
            continue

        outfile.write(f"  {key}:\n")
        outfile.write(f"    label: {key}\n")
        if 'required' in properties and key in properties['required']:
            outfile.write("    required: true\n")

        widget = determine_widget_type(key, value)
        write_widget(outfile, widget, value)
        write_help(outfile, value.get("description", ""))
        outfile.write("\n")

# Function to determine widget type
def determine_widget_type(key, value):
    widget_format = value.get("format", "").strip().lower()
    widget_type = value.get("type", "").strip().lower()
    widget_enum = value.get("enum", [])

    # If enum exists, the widget should be a "select" dropdown
    if widget_enum:
        return "select"

    if widget_type == "boolean":
        boolean_field_list.append(key)
        return "check_box"

    if widget_type == "string":
        if widget_format == "file-path" or widget_format == "path":
            return "path_selector"
        return "text_field"

    if widget_type in ["integer", "number"]:
        number_field_list.append(key)
        return "number_field"

    return None  # Explicitly return None for clarity


# Check if necessary files exist
check_file_exists(sys.argv[1])  # JSON schema file
check_file_exists(sys.argv[3])  # Base form YAML file

# Remove existing output file if it exists
if os.path.exists(sys.argv[2]):
    os.remove(sys.argv[2])

# Copy base form file
shutil.copyfile(sys.argv[3], sys.argv[2])

# Open the output files
formYmlOut = open(sys.argv[2], "a")
paramsJsonOut = open(sys.argv[4], "w")

# Process versions
versions = sorted(sys.argv[5].split('%'), reverse=True)
formYmlOut.write("\n  version:\n    label: Version\n    widget: select\n    options:")
for version in versions:
    if version:
        new_version = version.replace(".", "_")
        formYmlOut.write(f"\n      - ['{version}', '/cluster/tufts/biocontainers/nf-core/pipelines/PIPELINE/{version}/{new_version}']")

# Load schema JSON
with open(sys.argv[1]) as schemaJson:
    data = json.load(schemaJson)

formYmlOut.write("\n\n")

# Extract definitions
definitions = data.get('definitions', data.get('$defs', {}))
if not definitions:
    print("Error: Neither 'definitions' nor '$defs' found in the JSON file.")
    sys.exit(1)

# Process each definition
for name, definition in definitions.items():
    if name in ['institutional_config_options', 'generic_options', 'max_job_request_options']:
        continue
    formYmlOut.write(generate_parent_options(name, definition))
    formYmlOut.write("\n")
    process_properties(formYmlOut, definition.get('properties', {}))

# Write form fields
formYmlOut.write("\nform:\n")
default_form_fields = [
    "bc_num_hours", "executor", "cpu_partition", "num_core",
    "num_memory", "reservation", "version", "workdir", "outdir"
]
formYmlOut.write("\n".join(f"  - {field}" for field in default_form_fields) + "\n")

# Write the context variables into paramsJsonOut
paramsJsonOut.write("{\n")
paramsJsonOut.write("""    "outdir":"<%= context.outdir %>",\n""")  # Add comma at the end

# Convert lists to sets for faster lookups
hidden_set = set(hidden_list)
number_field_set = set(number_field_list)
boolean_field_set = set(boolean_field_list)

first_entry = True  # Flag to track first property to manage commas correctly

# Iterate through definitions
for name, definition in definitions.items():
    if name in {'institutional_config_options', 'generic_options', 'max_job_request_options'}:
        continue

    formYmlOut.write(f"  - {name}\n")

    # Iterate through properties
    properties = definition.get('properties', {})
    for k in properties:
        if k in {'email', 'outdir', 'igenomes_ignore'} or k in hidden_set:
            continue  # Skip excluded fields

        formYmlOut.write(f"  - {k}\n")

        # Add comma correctly before each new entry
        if first_entry:
            first_entry = False
        else:
            paramsJsonOut.write(",\n")  # Add comma between entries

        # Write parameters based on field type
        if k in number_field_set or k in boolean_field_set:
            paramsJsonOut.write(f"    \"{k}\": <%= context.{k} %>")
        else:
            paramsJsonOut.write(f"    \"{k}\": \"<%= context.{k} %>\"")

paramsJsonOut.write("\n}")
formYmlOut.write("  - TOWER_ACCESS_TOKEN\n  - resume\n")
paramsJsonOut.close()
formYmlOut.close()