#!/usr/bin/env bash
# Deploy PAP-3 static lab site to company VPS (Caddy file_server root).
# Run as user `paperclip` on the VPS after board approval for Plano B.
set -euo pipefail

SITE_NAME="pap-3-calculadora-magica-lab"
REMOTE_ROOT="/srv/lm-studios/previews/${SITE_NAME}"
PUBLIC_URL="https://preview.insta-ads.online/${SITE_NAME}/"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

FILES=(index.html styles.css app.js)

if [[ "$(whoami)" != "paperclip" ]]; then
  echo "warning: expected to run as paperclip (got $(whoami)); ensure write access to ${REMOTE_ROOT}" >&2
fi

mkdir -p "${REMOTE_ROOT}"
for f in "${FILES[@]}"; do
  src="${REPO_ROOT}/${f}"
  [[ -f "${src}" ]] || { echo "missing ${src}" >&2; exit 1; }
  install -m 0644 "${src}" "${REMOTE_ROOT}/${f}"
done

echo "Deployed to ${REMOTE_ROOT}"
echo "Public URL (HTTPS): ${PUBLIC_URL}"
echo "Smoke: curl -fsS -o /dev/null -w '%{http_code}\n' ${PUBLIC_URL}"
