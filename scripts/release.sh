#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE."
  echo "Keep production secrets in the untracked repo-root .env file before releasing."
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

echo "Importing Fly secrets from .env"
fly secrets import < "$ENV_FILE"

echo "Deploying backend to Fly"
fly deploy

echo "Building frontend"
(cd "$ROOT_DIR/frontend" && npm run build)

echo "Deploying frontend to Vercel"
(cd "$ROOT_DIR/frontend" && vercel --prod)

echo "Running release smoke test"
"$ROOT_DIR/scripts/check-release.sh"

echo "Release completed successfully."
