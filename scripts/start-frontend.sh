#!/bin/bash
set -e

echo "Starting frontend dev server..."
cd "$(dirname "$0")/../frontend"
npm run dev
