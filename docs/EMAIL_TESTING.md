# Email Testing

This project supports three email test paths:

- `generic` test email
- `receipt` test email
- `otp` test email
- `mock purchase` test flow that sends both admin and customer emails

## Debug Token

The debug endpoint is protected by `DEBUG_EMAIL_TOKEN`.

Local value:

```text
98ffb8bfa9453ff5934be728c634690e
```

If you rotate it, update:

- `.env.local`
- Fly secret `DEBUG_EMAIL_TOKEN`

## Test Endpoint

```http
POST /api/debug/email/test
```

Headers:

```http
X-Debug-Token: 98ffb8bfa9453ff5934be728c634690e
Content-Type: application/json
```

### Generic Test

```bash
curl -X POST 'https://psoriasis-backend.fly.dev/api/debug/email/test' \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Token: 98ffb8bfa9453ff5934be728c634690e' \
  -d '{
    "to": "enjerza@gmail.com",
    "type": "generic",
    "subject": "Psoriasis test email",
    "message": "This is a test email from the Psoriasis backend.",
    "ctaLabel": "Open dashboard",
    "ctaUrl": "https://frontend-eta-seven-55.vercel.app"
  }'
```

### Receipt Test

```bash
curl -X POST 'https://psoriasis-backend.fly.dev/api/debug/email/test' \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Token: 98ffb8bfa9453ff5934be728c634690e' \
  -d '{
    "to": "enjerza@gmail.com",
    "type": "receipt"
  }'
```

### OTP Test

```bash
curl -X POST 'https://psoriasis-backend.fly.dev/api/debug/email/test' \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Token: 98ffb8bfa9453ff5934be728c634690e' \
  -d '{
    "to": "enjerza@gmail.com",
    "type": "otp"
  }'
```

## Mock Purchase Test

This endpoint creates a fake paid order, stores it, and sends:

- one admin notification email
- one customer download email

```bash
curl -X POST 'https://psoriasis-backend.fly.dev/api/debug/purchase/mock' \
  -H 'Content-Type: application/json' \
  -H 'X-Debug-Token: 98ffb8bfa9453ff5934be728c634690e' \
  -d '{
    "customerName": "NOR SARAH DILA BINTI MOHD",
    "customerEmail": "noorsarahdila@gmail.com",
    "customerPhone": "+60196411175",
    "productName": "E-BOOK BEBAS PSORIASIS V2 + PERCUMA RESIPE PANTANG",
    "amount": 35.90,
    "currency": "RM",
    "paymentMethod": "ToyyibPay",
    "referralCode": "AISHAAFF"
  }'
```
