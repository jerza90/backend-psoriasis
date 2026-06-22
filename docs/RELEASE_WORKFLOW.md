# Release Workflow

This repo now has one production branch: `prod`.

Use `fix/local-dev-cors` only for local development. Keep it out of production deploys.

## 1. Before deploy

1. Switch to `prod`.
2. Pull the latest remote branch.
3. Make sure the production env file has real values:
   - Keep production secrets in the untracked repo-root `.env` file.
   - Fly backend: Stripe live keys, ToyyibPay live keys, Supabase `DATABASE_URL`, frontend URL.
   - Vercel frontend: `VITE_API_URL` only if you want to override the default Fly URL.
4. Build locally if you want a fast fail:
   - `mvn -q -DskipTests compile`
   - `cd frontend && npm run build`

## 2. Deploy backend

From the repo root:

```bash
fly deploy
```

If secrets changed:

```bash
fly secrets import < .env
```

## 3. Deploy frontend

From the `frontend/` folder:

```bash
npm run build
vercel --prod
```

## 4. Smoke test

Run the release smoke script after both deploys:

```bash
./scripts/check-release.sh
```

Optional environment variables:

```bash
LOGIN_EMAIL=aishaaffiliate \
LOGIN_PASSWORD='your-password' \
CHECKOUT_NAME='Smoke Test User' \
CHECKOUT_EMAIL='smoke@example.com' \
AFFILIATE_EMAIL=aishaaffiliate@example.com \
./scripts/check-release.sh
```

What it checks:

- Frontend `/` and `/login` return `200`
- Browser CORS from the frontend origin to the backend checkout endpoint is allowed
- Checkout session creation works for both `bm` and `en`
- Login works if you provide credentials
- Affiliate profile works if you provide an email

The script will read untracked secrets from the repo-root `.env` file if it exists.

## 5. How to read failures

- `Invalid API Key provided` means Stripe keys are wrong for that environment.
- `KEY-DID-NOT-EXIST-OR-USER-IS-NOT-ACTIVE` means ToyyibPay keys are wrong or inactive.
- `Invalid CORS request` means the backend allowed-origins list does not include the deployed frontend URL.
- `Affiliate profile not found` means the user exists in `users`, but the `affiliates` row is missing.
