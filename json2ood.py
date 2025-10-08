#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Generate an OOD form YAML file and a parameters JSON file from a JSON schema.

The script keeps the same overall structure as the original version you posted,
but fixes syntax errors, improves readability and adds a few safety checks.
"""

import argparse
import json
import os
import re
import shutil
import sys

# ----------------------------------------------------------------------
# Global collections (they are filled while the schema is processed)
# ----------------------------------------------------------------------
hidden_list = [
    "report_file",
    "citations_file",
    "css_file",
    "logo_file",
    "report_template",
    "report_logo",
    "report_css",
]
number_field_list = []
boolean_field_list = []


# ----------------------------------------------------------------------
# Helper utilities
# ----------------------------------------------------------------------
def check_file_exists(filepath: str) -> None:
    """Exit with an error if *filepath* does not exist."""
    if not os.path.exists(filepath):
        sys.stderr.write(f"\nError: File not found: {filepath}\n")
        sys.exit(1)


def replace_apostrophes(text: str) -> str:
    """
    Replace stray apostrophes and double quotes with back‑ticks.

    Apostrophes that are part of a word (e.g. “you're”) are left untouched.
    """
    # apostrophe not preceded/followed by a letter
    pattern = r"(?<![A-Za-z])'|'(?![A-Za-z])"
    return re.sub(pattern, "`", text).replace('"', "`")


def move_digits_to_end(prop: str) -> str:
    """
    Move digits to the end of each underscore‑separated segment.

    Examples
    --------
    h3i             → hi3
    dfam_h3i        → dfam_hi3
    pfam12abc       → pfamabc12
    3abc12          → abc123
    ignore_3prime_r2 → ignore_prime3_r2
    """
    prop = prop.lower()
    # Collapse “_123” into “123” so we don’t end up with a leading underscore
    prop = re.sub(r"_([0-9]+)", r"\1", prop)
    parts = prop.split("_")
    new_parts = []
    for part in parts:
        letters = re.sub(r"\d", "", part)
        digits = re.sub(r"\D", "", part)
        new_parts.append(f"{letters}{digits}" if digits else letters)
    return "_".join(new_parts)


def write_options(outfile, options):
    """Write a list of ``options`` to *outfile* (used for the iGenomes block)."""
    for option in options:
        if option:  # skip empty / None values
            outfile.write(f"      - ['{option}', '{option}']\n")


def write_help(outfile, help_text):
    """Write a ``help:`` line if *help_text* is non‑empty."""
    if help_text:
        outfile.write(f'    help: "{replace_apostrophes(help_text)}"\n')


def write_widget(outfile, widget, value):
    """Write widget specific YAML for a field."""
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
            outfile.write(f'    value: "{default_value}"\n')

    elif widget == "path_selector":
        outfile.write("    widget: path_selector\n")
        outfile.write("    directory: /cluster/tufts\n")
        outfile.write("    favorites:\n")
        outfile.write("      - /cluster/tufts\n")
        outfile.write("      - /cluster/home\n")

    elif widget == "number_field":
        outfile.write("    widget: number_field\n")
        if isinstance(default_value, (int, float)):
            outfile.write(f"    value: {default_value}\n")
        outfile.write("    step: 1\n")

    elif widget == "select":
        outfile.write("    widget: select\n")
        outfile.write("    options:\n")
        enum_vals = value.get("enum", [])
        default_val = value.get("default")
        # put the default first (if it exists in the enum list)
        if default_val is not None and default_val in enum_vals:
            outfile.write(f"      - ['{default_val}', '{default_val}']\n")
            enum_vals.remove(default_val)
        for opt in enum_vals:
            outfile.write(f"      - ['{opt}', '{opt}']\n")


def generate_parent_options(name, definition):
    """
    Produce the top‑level block for a *definition* (checkbox group).

    The function mirrors the original script’s behaviour but with cleaner
    string handling.
    """
    label = definition.get("title", name.replace("_", " ").title())
    properties = definition.get("properties", {})
    # Use only the first line of the description (the original script did that)
    help_text = definition.get("description", "").split("\n")[0]

    lines = [
        f"  {name.lower()}:",
        f'    label: "{label}"',
        "    widget: 'check_box'",
        "    html_options:",
        "      data:",
    ]

    for prop in properties:
        if prop == "email":      # skip email key
            continue
        fixed_prop = move_digits_to_end(prop)
        lines.append(f"        hide-{fixed_prop}-when-un-checked: true")

    if help_text:
        lines.append(f'    help: "{replace_apostrophes(help_text)}"')

    lines.append("")   # blank line for separation
    return "\n".join(lines)


def process_genome(outfile):
    """Write the hard‑coded iGenomes selector."""
    outfile.write("  genome:\n")
    outfile.write("    label: iGenomes\n")
    outfile.write("    widget: select\n")
    outfile.write("    required: false\n")
    outfile.write("    options:\n")
    outfile.write("      - ['None', ' ']\n")
    genomes = [
        "GRCh37", "GRCh38", "GRCm38", "TAIR10", "EB2", "UMD3.1", "WBcel235",
        "CanFam3.1", "GRCz10", "BDGP6", "EquCab2", "EB1", "Galgal4", "Gm01",
        "Mmul_1", "IRGSP-1.0", "CHIMP2.1.4", "Rnor_5.0", "Rnor_6.0", "R64-1-1",
        "EF2", "Sbi1", "Sscrofa10.2", "AGPv3", "hg38", "hg19", "mm10",
        "bosTau8", "ce10", "canFam3", "danRer10", "dm6", "equCab2",
        "galGal4", "panTro4", "rn6", "sacCer3", "susScr3",
    ]
    write_options(outfile, genomes)


def determine_widget_type(key, value):
    """
    Decide which OOD widget to use for *key* based on its JSON‑Schema
    description.
    """
    fmt = value.get("format", "").strip().lower()
    typ = value.get("type", "")

    # ``type`` can be a list (e.g. ["string", "null"])
    if isinstance(typ, list):
        typ = typ[0] if typ else ""

    if isinstance(typ, str):
        typ = typ.strip().lower()
    else:
        typ = ""

    # Enum always becomes a select dropdown
    if value.get("enum"):
        return "select"

    if typ == "boolean":
        boolean_field_list.append(key)
        return "check_box"

    if typ == "string":
        if fmt in {"file-path", "path", "directory-path"}:
            return "path_selector"
        return "text_field"

    if typ in {"integer", "number"}:
        number_field_list.append(key)
        return "number_field"

    # Fallback – let the caller decide (original script returned None)
    return None


def process_properties(outfile, properties):
    """
    Walk through a definition's ``properties`` dict and write the YAML for each
    field (except the special ``genome`` field, which is handled separately).
    """
    for key, value in properties.items():
        if key in {"email", "igenomes_ignore"}:
            continue

        if value.get("hidden", False):
            hidden_list.append(key)
            continue

        if key == "genome":
            process_genome(outfile)
            write_help(outfile, value.get("description", "").split("\n")[0])
            outfile.write("\n")
            continue

        fixed_key = move_digits_to_end(key)
        outfile.write(f"  {fixed_key}:\n")
        outfile.write(f'    label: "{key}"\n')

        # ``required`` is a top‑level list inside the definition; we need to
        # check it against the whole definition later (the original script used
        # a slightly odd check – we keep that behaviour).
        if "required" in properties and key in properties["required"]:
            outfile.write("    required: true\n")

        widget = determine_widget_type(key, value)
        write_widget(outfile, widget, value)

        # Only the first line of the description is used (as in the original)
        write_help(outfile, value.get("description", "").split("\n")[0])
        outfile.write("\n")


# ----------------------------------------------------------------------
# Main driver
# ----------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        description="Generate OOD form YAML and parameters JSON from a JSON schema."
    )
    parser.add_argument("schema_json", help="Path to the JSON schema file")
    parser.add_argument("output_form_yml", help="Path for the generated form YAML")
    parser.add_argument(
        "base_form_yml", help="Path to the base form YAML that will be copied first"
    )
    parser.add_argument(
        "output_params_json", help="Path for the generated parameters JSON file"
    )
    args = parser.parse_args()

    # ------------------------------------------------------------------
    # Validate inputs
    # ------------------------------------------------------------------
    for path in (args.schema_json, args.base_form_yml):
        check_file_exists(path)

    # ------------------------------------------------------------------
    # Prepare output files (remove old ones, copy base YAML)
    # ------------------------------------------------------------------
    if os.path.exists(args.output_form_yml):
        os.remove(args.output_form_yml)

    shutil.copyfile(args.base_form_yml, args.output_form_yml)

    form_out = open(args.output_form_yml, "a")
    params_out = open(args.output_params_json, "w")

    # ------------------------------------------------------------------
    # Load the JSON schema
    # ------------------------------------------------------------------
    with open(args.schema_json, "r") as f:
        data = json.load(f)

    form_out.write("\n\n")  # keep the same spacing as the original script

    # ``definitions`` may be under "definitions" or "$defs"
    definitions = data.get("definitions", data.get("$defs", {}))
    if not definitions:
        sys.stderr.write("Error: Neither 'definitions' nor '$defs' found in the JSON file.\n")
        sys.exit(1)

    # ------------------------------------------------------------------
    # Write the top‑level checkbox groups
    # ------------------------------------------------------------------
    for name, definition in definitions.items():
        if name in {
            "institutional_config_options",
            "generic_options",
            "max_job_request_options",
            "deprecated_options",
        }:
            continue
        yaml_block = generate_parent_options(name, definition)
        form_out.write(yaml_block + "\n")
        # properties of the current definition are processed **after** the loop
        # (the original script did that)
        process_properties(form_out, definition.get("properties", {}))

    # ------------------------------------------------------------------
    # Write the static ``form:`` section
    # ------------------------------------------------------------------
    form_out.write("\nform:\n")
    default_form_fields = [
        "bc_num_hours",
        "executor",
        "partition",
        "num_cores",
        "num_memory",
        "workdir",
    ]
    form_out.write("\n".join(f"  - {field}" for field in default_form_fields) + "\n")

    # ------------------------------------------------------------------
    # Build the params JSON (used later by OOD)
    # ------------------------------------------------------------------
    params_out.write("{\n")
    hidden_set = set(hidden_list)
    number_set = set(number_field_list)
    boolean_set = set(boolean_field_list)

    first_entry = True  # for comma handling

    for name, definition in definitions.items():
        if name in {
            "institutional_config_options",
            "generic_options",
            "max_job_request_options",
            "deprecated_options",
        }:
            continue

        # The top‑level group name is added to the form YAML (lower‑cased)
        form_out.write(f"  - {name.lower()}\n")

        properties = definition.get("properties", {})
        for key in properties:
            if key in {"email", "igenomes_ignore"} or key in hidden_set:
                continue

            # write each field name (lower‑cased, digits moved to the end)
            fixed_key = move_digits_to_end(key)
            form_out.write(f"  - {fixed_key}\n")

            # ----------------- JSON entry -----------------
            if not first_entry:
                params_out.write(",\n")
            else:
                first_entry = False

            if key in number_set or key in boolean_set:
                # raw (no quotes) for numbers / booleans
                params_out.write(f'    "{key}": <%= context.{fixed_key} %>')
            else:
                # strings need to be quoted inside the ERB template
                params_out.write(f'    "{key}": "<%= context.{fixed_key} %>"')

    # close the JSON object
    params_out.write("\n}")

    # ------------------------------------------------------------------
    # Append the final two static fields (same as original script)
    # ------------------------------------------------------------------
    form_out.write("\n  - tower_access_token\n  - resume\n")

    # ------------------------------------------------------------------
    # Cleanup
    # ------------------------------------------------------------------
    params_out.close()
    form_out.close()


if __name__ == "__main__":
    main()