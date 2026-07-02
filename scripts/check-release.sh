#!/bin/bash
set -euo pipefail

FRONTEND_URL="${FRONTEND_URL:-https://frontend-eta-seven-55.vercel.app}"
BACKEND_URL="${BACKEND_URL:-https://psoriasis-backend.fly.dev}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -f "$ROOT_DIR/.env" ]]; then
  set -a
  # Optional production secrets live in the untracked .env file.
  # Shell vars already set by the caller still win over the file values.
  . "$ROOT_DIR/.env"
  set +a
fi

node_json_field() {
  node --input-type=module -e '
    import fs from "node:fs";
    const input = fs.readFileSync(0, "utf8").trim();
    const data = JSON.parse(input);
    const field = process.argv[1];
    const value = field.split(".").reduce((obj, key) => obj?.[key], data);
    if (value == null || value === "") process.exit(2);
    process.stdout.write(typeof value === "string" ? value : JSON.stringify(value));
  ' "$1"
}

check_head() {
  local url="$1"
  local label="$2"
  echo "Checking $label: $url"
  curl -fsSI "$url" >/dev/null
}

check_cors() {
  echo "Checking CORS preflight: $BACKEND_URL/api/checkout/create-session"
  local response headers
  headers="$(curl -fsSI -X OPTIONS "$BACKEND_URL/api/checkout/create-session" \
    -H "Origin: $FRONTEND_URL" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: content-type")"

  if ! printf '%s' "$headers" | grep -qi "^access-control-allow-origin: $FRONTEND_URL"; then
    echo "CORS check failed: frontend origin was not allowed."
    exit 1
  fi
}

check_checkout() {
  local product="$1"
  local full_name="${CHECKOUT_NAME:-Smoke Test User}"
  local email="${CHECKOUT_EMAIL:-smoke@example.com}"

  echo "Checking checkout session ($product)"
  local body response url
  body="$(printf '{"fullName":"%s","email":"%s","product":"%s"}' "$full_name" "$email" "$product")"
  response="$(curl -fsS -X POST "$BACKEND_URL/api/checkout/create-session" \
    -H 'Content-Type: application/json' \
    -d "$body")"
  url="$(printf '%s' "$response" | node_json_field url)"
  echo "  -> $url"
}

check_login() {
  local email="${LOGIN_EMAIL:-}"
  local password="${LOGIN_PASSWORD:-}"

  if [[ -z "$email" || -z "$password" ]]; then
    echo "Skipping login smoke test (set LOGIN_EMAIL and LOGIN_PASSWORD to enable)."
    return 0
  fi

  echo "Checking login smoke test"
  local body response username role
  body="$(printf '{"email":"%s","password":"%s"}' "$email" "$password")"
  response="$(curl -fsS -X POST "$BACKEND_URL/api/auth/login" \
    -H 'Content-Type: application/json' \
    -d "$body")"
  username="$(printf '%s' "$response" | node_json_field username)"
  role="$(printf '%s' "$response" | node_json_field role)"
  echo "  -> logged in as $username ($role)"
}

check_affiliate_profile() {
  local email="${AFFILIATE_EMAIL:-}"

  if [[ -z "$email" ]]; then
    echo "Skipping affiliate profile check (set AFFILIATE_EMAIL to enable)."
    return 0
  fi

  echo "Checking affiliate profile"
  curl -fsS --get --data-urlencode "email=$email" "$BACKEND_URL/api/affiliate/profile" >/dev/null
}

echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"

check_head "$FRONTEND_URL/" "frontend home"
check_head "$FRONTEND_URL/login" "frontend login"
check_cors
check_checkout bm
check_checkout en
check_login
check_affiliate_profile

echo "Release smoke test passed."
