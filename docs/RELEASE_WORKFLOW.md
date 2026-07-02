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

## 2. One-command release

From the repo root:

```bash
./scripts/release.sh
```

That script will:

1. Import Fly secrets from the untracked `.env`
2. Deploy the backend with `fly deploy`
3. Build the frontend
4. Deploy the frontend with `vercel --prod`
5. Run the smoke test

Optional environment variables for the smoke test portion:

```bash
LOGIN_EMAIL=aishaaffiliate \
LOGIN_PASSWORD='your-password' \
CHECKOUT_NAME='Smoke Test User' \
CHECKOUT_EMAIL='smoke@example.com' \
AFFILIATE_EMAIL=aishaaffiliate@example.com \
./scripts/release.sh
```

What it checks:

- Frontend `/` and `/login` return `200`
- Browser CORS from the frontend origin to the backend checkout endpoint is allowed
- Checkout session creation works for both `bm` and `en`
- Login works if you provide credentials
- Affiliate profile works if you provide an email

The scripts read untracked secrets from the repo-root `.env` file.

## 3. How to read failures

- `Invalid API Key provided` means Stripe keys are wrong for that environment.
- `KEY-DID-NOT-EXIST-OR-USER-IS-NOT-ACTIVE` means ToyyibPay keys are wrong or inactive.
- `Invalid CORS request` means the backend allowed-origins list does not include the deployed frontend URL.
- `Affiliate profile not found` means the user exists in `users`, but the `affiliates` row is missing.
