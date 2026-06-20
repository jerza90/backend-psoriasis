## Project

Psoriasis ebook landing page + dual-product checkout (BM RM39 / EN $27 USD) with Stripe.

## Java

- Project requires **Java 17** (Spring Boot 3.2.0)
- Default system Java is 1.8 — use full path to run:
  ```bash
  /Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home/bin/java -jar target/psoriasis-backend-1.0.0.jar
  ```
- Build: `mvn clean package -DskipTests` (set JAVA_HOME to Java 17 first)

## Stripe

- **Test key** in `application.properties`: `stripe.secret-key`
- Test card: `4242 4242 4242 4242`, any future date, any CVC
- Price IDs (test mode):
  - BM: `price_1TkRRe9lkUEilcuQ8tzNzFuT`
  - EN: `price_1TkRSz9lkUEilcuQ8f12eX1X`

## ToyyibPay (BM local payments)

- BM (RM 39) → ToyyibPay (FPX / online banking)
- EN ($27 USD) → Stripe (credit card)
- Sandbox: `https://dev.toyyibpay.com` (set in `toyyipay.base-url`)
- Production: `https://toyyibpay.com`
- Update credentials in `application.properties`:
  - `toyyipay.user-secret-key`
  - `toyyipay.category-code`
- BM bill amount is `3900` (RM 39.00 in sen) — no processing surcharge
- Sandbox credentials for reference:
  - `toyyipay.user-secret-key=5954lso7-ocz1-tjgg-t99r-kelorq4k07kd`
  - `toyyipay.category-code=c8xg913m`
- Callback URL (`toyyipay.callback-url`): for production, change to `https://yourdomain.com/api/payment/toyyipay-callback`

## Production Checklist

### 1. Stripe (live mode)

| Property | Action |
|---|---|
| `stripe.secret-key` | Replace `sk_test_...` with `sk_live_...` |
| `stripe.webhook-secret` | Replace `whsec_test_...` with `whsec_live_...` |
| `stripe.price-bm` | Create BM price in Stripe live → update ID |
| `stripe.price-en` | Create EN price in Stripe live → update ID |

### 2. App URLs

| Property | Change to |
|---|---|
| `frontend.url` | `https://yourdomain.com` |
| `app.ebook.download-base-url` | `https://yourdomain.com/api/download` |
| CORS origins | frontend domain in SecurityConfig/nginx |

### 3. Secrets

| Property | Action |
|---|---|
| `app.jwt.secret` | Strong random secret (>= 256-bit) |
| `spring.datasource.password` | Production DB password |
| `spring.mail.username/password` | Real SMTP credentials |

### 4. Infrastructure

- Enable HTTPS (Cloudflare / nginx / ELB)
- Set up Stripe webhook endpoint → `https://yourdomain.com/api/webhooks/stripe`
- Switch database to production Postgres
- Set up Redis (or disable if not used)
- Flyway will handle schema migrations on startup

### 5. Deployment

Recommended: use `application-prod.properties` and run with:
```bash
java -jar app.jar --spring.profiles.active=prod
```

## Order Tracking

Both gateways store orders in the `payment_orders` table via `PaymentOrder` model:
- **ToyyibPay**: Stores bill on creation, fetches full transaction details (ref no, channel, amount, charge, net, payer info, payment date) via `getBillTransactions` API on callback/status check
- **Stripe**: Stores session on creation, webhook (`/api/webhooks/stripe`) captures payment intent, balance transaction (fee, net), refund date, and decline reason on `charge.refunded` / `payment_intent.payment_failed` events

Stripe webhook secret is still placeholder — set up real webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe`.

## Frontend i18n

- `checkout` keys are at **root level** in both `en.json` and `ms.json` (not nested under `ebook`)
- If translation keys show as raw text, verify the key path matches the JSON structure
