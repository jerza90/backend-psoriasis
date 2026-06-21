#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOCAL_ENV_FILE="$ROOT_DIR/.env.local"
EXAMPLE_ENV_FILE="$ROOT_DIR/.env.local.example"

if [ ! -f "$LOCAL_ENV_FILE" ]; then
  if [ -f "$EXAMPLE_ENV_FILE" ]; then
    echo "Missing .env.local. Create one from .env.local.example before running locally."
    exit 1
  fi
fi

set -a
. "$LOCAL_ENV_FILE"
set +a

JAVA_17_HOME="/Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home"

echo "Starting local Postgres and Redis..."
docker compose -f "$ROOT_DIR/docker-compose.yml" up -d postgres

echo "Creating local database if needed..."
export PGPASSWORD="${DB_PASSWORD:-password}"
psql -h localhost -U "${DB_USERNAME:-postgres}" -tc "SELECT 1 FROM pg_database WHERE datname='${LOCAL_DB_NAME:-psoriasis_local}'" 2>/dev/null | grep -q 1 || createdb -h localhost -U "${DB_USERNAME:-postgres}" "${LOCAL_DB_NAME:-psoriasis_local}" 2>/dev/null || true

echo "Starting backend..."
(
  cd "$ROOT_DIR"
  JAVA_HOME="$JAVA_17_HOME" mvn spring-boot:run
)
