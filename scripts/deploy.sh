#!/bin/bash

# Deployment script for Psoriasis Backend API
# This script deploys the application to Fly.io

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Check for required environment variables
required_vars=(
    "SPRING_DATASOURCE_URL"
    "SPRING_DATASOURCE_USERNAME"
    "SPRING_DATASOURCE_PASSWORD"
    "APP_JWT_SECRET"
)

for var_name in "${required_vars[@]}"; do
    if [[ -z "${!var_name:-}" ]]; then
        echo "Missing required environment variable: $var_name"
        echo "Please set all required environment variables before deploying."
        exit 1
    fi
done

# Build the application
echo "Building the application..."
mvn clean package -DskipTests

# Deploy to Fly.io
echo "Deploying to Fly.io..."
fly deploy --app psoriasis-backend

# Set secrets
echo "Setting secrets..."
fly secrets set SPRING_DATASOURCE_URL="$SPRING_DATASOURCE_URL" \
    SPRING_DATASOURCE_USERNAME="$SPRING_DATASOURCE_USERNAME" \
    SPRING_DATASOURCE_PASSWORD="$SPRING_DATASOURCE_PASSWORD" \
    APP_JWT_SECRET="$APP_JWT_SECRET" \
    APP_IHERB_AFFILIATE_ID="$APP_IHERB_AFFILIATE_ID" \
    SENDGRID_API_KEY="$SENDGRID_API_KEY"

# Run health check
echo "Running health check..."
fly logs --app psoriasis-backend -n 10

echo "Deployment completed successfully!"
