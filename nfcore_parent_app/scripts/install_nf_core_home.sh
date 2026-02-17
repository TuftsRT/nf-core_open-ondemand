







#!/usr/bin/env bash
set -euo pipefail

# Deploy the standalone nf-core parent app into OOD sys apps.
#
# Usage:
#   ./scripts/install_nf_core_home.sh [/var/www/ood/apps/sys/nf-core-home]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_SRC_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TARGET_DIR="${1:-/var/www/ood/apps/sys/nf-core-home}"

echo "Deploying from: ${APP_SRC_DIR}"
echo "Deploying to:   ${TARGET_DIR}"

mkdir -p "${TARGET_DIR}"
cp -a "${APP_SRC_DIR}/." "${TARGET_DIR}/"

echo
echo "Deployment complete."
echo "Next steps:"
echo "1. Confirm ownership/permissions for OOD."
echo "2. Optionally set NF_CORE_CATALOG to a central catalog file."
echo "3. Reload user NGINX or re-open the dashboard."

