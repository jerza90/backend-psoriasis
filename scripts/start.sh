#!/bin/bash
set -e

JAVA_17_HOME="/opt/homebrew/Cellar/openjdk@17/17.0.19/libexec/openjdk.jdk/Contents/Home"

echo "Starting PostgreSQL..."
docker-compose up -d 2>/dev/null || true

echo "Creating database if not exists..."
psql -h localhost -U postgres -tc "SELECT 1 FROM pg_database WHERE datname='psoriasis_db'" 2>/dev/null | grep -q 1 || createdb -h localhost -U postgres psoriasis_db 2>/dev/null || true

echo "Starting backend..."
JAVA_HOME="$JAVA_17_HOME" mvn spring-boot:run
