#!/usr/bin/env bash
set -euo pipefail

# Build a starter catalog YAML from installed nf-core app directories.
#
# Usage:
#   ./scripts/generate_catalog_from_apps.sh [apps_sys_dir] [output_yaml]
#
# Example:
#   ./scripts/generate_catalog_from_apps.sh /var/www/ood/apps/sys /etc/ood/config/apps/nf-core-catalog.yml

APPS_DIR="${1:-/var/www/ood/apps/sys}"
OUT_FILE="${2:-./config/pipelines.generated.yml}"

tmp_file="$(mktemp)"
trap 'rm -f "${tmp_file}"' EXIT

{
  echo "---"
  echo "title: nf-core Pipelines"
  echo "description: >"
  echo "  Auto-generated catalog from installed nf-core app directories."
  echo "groups:"
  echo "  - name: All Pipelines"
  echo "    pipelines:"

  found=0
  for app_path in "${APPS_DIR}"/nf-core-*; do
    [[ -d "${app_path}" ]] || continue
    app_name="$(basename "${app_path}")"
    display_name="${app_name#nf-core-}"
    display_name="${display_name//-/ }"
    echo "      - app_name: ${app_name}"
    echo "        title: ${display_name}"
    echo "        summary: Add summary for ${app_name}."
    echo "        tags: [Review]"
    found=1
  done

  if [[ "${found}" -eq 0 ]]; then
    echo "      - app_name: example-app"
    echo "        title: Example Pipeline"
    echo "        summary: No nf-core apps found in ${APPS_DIR}."
    echo "        tags: [Placeholder]"
  fi
} > "${tmp_file}"

mkdir -p "$(dirname "${OUT_FILE}")"
cp "${tmp_file}" "${OUT_FILE}"

echo "Generated catalog: ${OUT_FILE}"

