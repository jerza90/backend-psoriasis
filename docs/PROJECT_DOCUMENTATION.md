# Psoriasis-Backend — Project Documentation

## 1. Project Overview

Two-brand wellness education platform for people with psoriasis:

- **FreeFromPsoriasis** (English / global) — education-first, affiliate product recommendations
- **BebasPsoriasis** (Bahasa Malaysia / local) — BM e-book sales & affiliate system

Users land via content (TikTok, Instagram), opt into a free checklist, purchase e-book, or visit affiliate public pages.

---

## 2. Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | ~6 | Type safety |
| Vite | ~8 | Build tool / dev server |
| react-router-dom | ~7 | Routing |
| i18next | ~26 | Internationalization (EN + MS) |
| lucide-react | ~1 | Icons |
| Tailwind CSS | ~4 | Styling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Language |
| Spring Boot | 3.2.0 | REST API framework |
| Spring Data JPA | 3.2.0 | ORM / database |
| Spring Security | 3.2.0 | Security / CSRF |
| PostgreSQL | 16 | Database |
| Flyway | - | Schema migrations |

---

## 3. Frontend Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | LandingPage | Main hero with e-book promotion |
| `/checkout` | CheckoutPage | Dual-product checkout (BM ToyyibPay / EN Stripe) |
| `/thank-you` | ThankYouPage | Post-purchase download page |
| `/tips` | TipsPage | Tips & education articles |
| `/tips/ebook` | EbookGalleryPage | E-book gallery/detail |
| `/products` | ProductsPage | Supplement product recommendations |
| `/checklist` | ChecklistPage | Free flare-up checklist capture |
| `/faq` | FaqPage | Frequently asked questions |
| `/blog` | BlogPage | Education blog listing |
| `/blog/:id` | BlogPostPage | Individual blog post |
| `/login` | LoginPage | User/affiliate login |
| `/register` | RegisterPage | User registration |
| `/forgot-password` | ForgotPasswordPage | Password reset |
| `/affiliate/dashboard` | AffiliateDashboardPage | Affiliate profile editor |
| `/affiliate/:referralCode` | AffiliatePublicPage | Public affiliate story page |
| `/admin/testimonials` | AdminTestimonialsPage | Testimonial CRUD |

---

## 4. REST API

Base URL: `http://localhost:8080/api` (dev) / `https://psoriasis-backend.fly.dev/api` (prod)

Production frontend:

- `https://freefrompsoriasis.com`
- `https://www.freefrompsoriasis.com`

The backend uses `FRONTEND_URL` and `FRONTEND_ALLOWED_ORIGINS` to generate checkout return URLs and allow CORS for the live frontend domain.

### 4.1 Authentication (`/api/auth`)

| Method | Path | Body | Response | Description |
|--------|------|------|----------|-------------|
| `POST` | `/api/auth/login` | `LoginRequest` (email, password) | `AuthResponseDTO` (id, email, fullName, username, role) | Login with email/username + password |
| `POST` | `/api/auth/register` | `RegisterRequest` (email) | `MessageResponseDTO` (message) | Send 6-digit OTP to email |
| `POST` | `/api/auth/verify-registration` | `VerifyRegistrationRequest` (email, otpCode, password, fullName, username) | `RegistrationResponseDTO` (message, userId, role) | Verify OTP + create account |
| `POST` | `/api/auth/forgot-password` | `ForgotPasswordRequest` (email) | `MessageResponseDTO` (message) | Send OTP for password reset |
| `POST` | `/api/auth/reset-password` | `ResetPasswordRequest` (email, otpCode, newPassword) | `MessageResponseDTO` (message) | Verify OTP + reset password |

### 4.2 Users (`/api/users`)

| Method | Path | Body / Param | Response | Description |
|--------|------|-------------|----------|-------------|
| `POST` | `/api/users` | `UserCreateRequest` (username, email, password, fullName) | `UserResponseDTO` | Create new user |
| `GET` | `/api/users/username/{username}` | Path: username | `UserResponseDTO` (200/404) | Get user by username |
| `GET` | `/api/users/email/{email}` | Path: email | `UserResponseDTO` (200/404) | Get user by email |
| `GET` | `/api/users/exists/username/{username}` | Path: username | `boolean` | Check username availability |
| `GET` | `/api/users/exists/email/{email}` | Path: email | `boolean` | Check email availability |

### 4.3 Checkout (`/api/checkout`)

| Method | Path | Body / Param | Response | Description |
|--------|------|-------------|----------|-------------|
| `POST` | `/api/checkout/create-session` | `CheckoutRequest` (fullName, email, product, referralCode?) | `CheckoutUrlResponseDTO` (url) | Create payment session — ToyyibPay for "bm", Stripe for "en" |
| `GET` | `/api/checkout/session/{sessionId}` | Path: sessionId | `PaymentStatusResponseDTO` (paymentStatus, downloadReady) | Check session payment status |
| `POST` | `/api/checkout/session/{sessionId}/request-download` | Path: sessionId | `DownloadUrlResponseDTO` (downloadUrl) | Get temporary download link |

### 4.4 Payment (`/api/payment`)

| Method | Path | Param | Response | Description |
|--------|------|-------|----------|-------------|
| `POST` | `/api/payment/toyyipay-callback` | `@RequestParam` billcode | `200 OK` | ToyyibPay payment callback |
| `GET` | `/api/payment/toyyipay-status` | `@RequestParam` billCode | `PaymentStatusResponseDTO` | Check ToyyibPay status |
| `POST` | `/api/payment/toyyipay-download` | `@RequestParam` billCode | `DownloadUrlResponseDTO` | Download after ToyyibPay payment |

### 4.5 Webhooks (`/api/webhooks`)

| Method | Path | Headers | Response | Description |
|--------|------|---------|----------|-------------|
| `POST` | `/api/webhooks/stripe` | `Stripe-Signature` | `200 "received"` / `400 "Invalid signature"` | Stripe webhook — handles checkout.session.completed, charge.refunded, payment_intent.payment_failed |

### 4.6 E-Book Download (`/api/ebook`)

| Method | Path | Param | Response | Description |
|--------|------|-------|----------|-------------|
| `GET` | `/api/ebook/download/{token}` | Path: token | Streams PDF file | Download ebook with valid token |

Error codes: 410 (expired), 403 (limit reached), 404 (invalid token), 500 (error)

### 4.7 Testimonials (`/api/testimonials`)

| Method | Path | Param | Response | Description |
|--------|------|-------|----------|-------------|
| `GET` | `/api/testimonials` | `?lang=ms` (default ms) | `List<TestimonialResponse>` | List published testimonials by language |
| `GET` | `/api/testimonials/featured` | `?lang=ms` (default ms) | `List<TestimonialResponse>` | List featured testimonials by language |
| `GET` | `/api/testimonials/{id}` | Path: id | `TestimonialResponse` (200/404) | Get single testimonial |

### 4.8 Admin Testimonials (`/api/admin/testimonials`)

| Method | Path | Body / Param | Response | Description |
|--------|------|-------------|----------|-------------|
| `GET` | `/api/admin/testimonials` | — | `List<TestimonialResponse>` | List all (including unpublished) |
| `POST` | `/api/admin/testimonials` | `TestimonialAdminRequest` (full testimonial data + progressHistory) | `TestimonialResponse` | Create testimonial |
| `PUT` | `/api/admin/testimonials/{id}` | Path: id + `TestimonialAdminRequest` | `TestimonialResponse` | Update testimonial |
| `DELETE` | `/api/admin/testimonials/{id}` | Path: id | `MessageResponseDTO` | Delete testimonial |

### 4.9 Affiliate (`/api/affiliate`)

| Method | Path | Body / Param | Response | Description |
|--------|------|-------------|----------|-------------|
| `POST` | `/api/affiliate/register` | `AffiliateRegistrationRequest` (name, email, bio, socialLinks, paymentInfo) | `AffiliateResponseDTO` (full profile) | Register new affiliate, generates referral code |
| `GET` | `/api/affiliate/lookup` | `?code=` | `AffiliatePublicResponseDTO` (empty if not found) | Lookup by referral code |
| `GET` | `/api/affiliate/public` | `?code=` | `AffiliatePublicResponseDTO` (200/404) | Get public affiliate profile |
| `GET` | `/api/affiliate/{id}/conversions` | Path: id | `AffiliateConversionsResponseDTO` | Get conversion stats |
| `GET` | `/api/affiliate/{id}` | Path: id | `AffiliateResponseDTO` (200/404) | Get full profile by ID |
| `GET` | `/api/affiliate/profile` | `?email=` | `AffiliateResponseDTO` (200/404) | Get profile by email |
| `PUT` | `/api/affiliate/profile` | `?email=` + `AffiliateProfileUpdateRequest` (all profile fields including progressImages) | `AffiliateResponseDTO` | Update profile |

### 4.10 Upload (`/api/upload`)

| Method | Path | Body | Response | Description |
|--------|------|------|----------|-------------|
| `POST` | `/api/upload` | `multipart/form-data` file | `{"url": "/uploads/uuid.ext"}` | Upload image (max 10MB), stored in `local-ebooks/affiliate-uploads/` |

### 4.11 Debug (`/api/debug`)

| Method | Path | Headers | Body | Response | Description |
|--------|------|---------|------|----------|-------------|
| `POST` | `/api/debug/email/test` | `X-Debug-Token` | `DebugEmailRequest` (to, type, subject?, message?, ctaLabel?, ctaUrl?) | `DebugEmailResponseDTO` | Send test email (receipt/otp/generic) |
| `POST` | `/api/debug/purchase/mock` | `X-Debug-Token` | `MockPurchaseRequest` (customerName, customerEmail, amount?, referralCode?, etc.) | `DebugPurchaseResponseDTO` (orderRef, downloadUrl) | Create mock paid order + send receipt |

### 4.12 Static Resources

| Path | Source | Description |
|------|--------|-------------|
| `/uploads/**` | `file:local-ebooks/affiliate-uploads/` | Serves uploaded affiliate images |
| `/actuator/health` | Spring Boot Actuator | Health check |
| `/actuator/info` | Spring Boot Actuator | App info |
| `/actuator/metrics` | Spring Boot Actuator | Metrics |

---

## 5. Database Schema (Flyway Migrations)

### 5.1 Migration History

| Migration | Description |
|-----------|-------------|
| `V1__initial_schema.sql` | Base product/pages tables |
| `V2__add_users.sql` | Users table |
| `V3__add_toyyipay_orders.sql` | ToyyibPay order columns |
| `V4__add_payment_orders.sql` | Payment orders table |
| `V5__add_payment_order_fields.sql` | Extended payment fields |
| `V6__add_download_fields.sql` | Download token columns |
| `V7__add_affiliate_system.sql` | Affiliates, conversions, referral columns |
| `V8__add_testimonials.sql` | Testimonials + progress tables |
| `V9__seed_testimonials.sql` | Demo testimonial data |
| `V10__add_user_roles.sql` | Role column + backfill |
| `V11__extend_affiliate_profile.sql` | Story/blog fields |
| `V12__extend_affiliate_public_page.sql` | Page/tips/guide/progress fields |
| `V13__seed_affiliates.sql` | 10 demo affiliate profiles |
| `V14__seed_affiliate_login_user.sql` | Aisha affiliate login user |
| `V15__seed_testimonials_ms_shared.sql` | BM shared testimonials |
| `V16__add_affiliate_progress_images.sql` | Progress images column |

### 5.2 Core Tables

**users**
- `id` BIGSERIAL PK
- `username` VARCHAR(255) UNIQUE
- `email` VARCHAR(255) NOT NULL UNIQUE
- `password_hash` VARCHAR(255) NOT NULL
- `full_name` VARCHAR(255)
- `role` VARCHAR(20) default 'user' — values: 'user', 'affiliate', 'admin'
- `enabled` BOOLEAN default false
- `otp_code` VARCHAR(6)
- `otp_expiry` TIMESTAMP
- `created_at`, `updated_at` TIMESTAMP

**payment_orders**
- `id` BIGSERIAL PK
- `order_ref` VARCHAR(255) UNIQUE
- `payment_method` VARCHAR(50)
- `customer_name`, `customer_email`, `customer_phone`
- `product_name`, `amount` DECIMAL(10,2), `currency`
- `payment_status`, `status`
- `bill_code` (ToyyibPay), `stripe_session_id`, `stripe_payment_intent_id`
- `ref_no`, `payment_channel`, `transaction_charge`, `nett_received`, `decline_reason`
- `payment_date`, `refunded_date`, `created_date`
- `download_token`, `download_count`, `max_downloads`, `token_expires_at`
- `referral_code`, `affiliate_id`, `commission_rate`, `commission_amount`

**affiliates**
- `id` BIGSERIAL PK
- `name` NOT NULL, `email` NOT NULL UNIQUE, `referral_code` NOT NULL UNIQUE
- `bio`, `avatar_url`, `social_links`, `payment_info`
- `page_title`, `page_intro`
- `story_title`, `story_summary`, `story_body`
- `blog_title`, `blog_excerpt`, `blog_url`, `blog_image_url`
- `tips_title`, `tips_text`
- `guide_title`, `guide_text`
- `progress_title`, `progress_text`, `progress_images` TEXT (JSON array of URLs)
- `commission_rate` DECIMAL(5,4) default 0.5000
- `total_earned` DECIMAL(10,2) default 0
- `total_paid` DECIMAL(10,2) default 0
- `status` VARCHAR(20) default 'active'
- `created_at`, `updated_at` TIMESTAMP

**referral_conversions**
- `affiliate_id` FK, `payment_order_id` FK
- `order_amount`, `commission_rate`, `commission_amount`
- `status` VARCHAR(20) default 'pending'
- `created_at`, `paid_at` TIMESTAMP

**testimonials**
- `id` BIGSERIAL PK
- `affiliate_id` (nullable FK)
- `name`, `location`, `condition_duration`, `categories` TEXT[]
- `summary`, `initial_quote`, `result_quote`
- `featured` BOOLEAN, `avatar_url`, `lang`, `sort_order`, `status`
- `created_at`, `updated_at`

**testimonial_progress**
- `id` BIGSERIAL PK
- `testimonial_id` FK
- `date_label`, `title`, `description`, `notes`, `tips` TEXT[], `images` TEXT[], `product_tags` JSONB, `details` JSONB
- `sort_order`, `created_at`

---

## 6. Payment Integration

### E-Book Checkout

**BM (RM 39.00)** → ToyyibPay (FPX / online banking)
**EN ($27.00 USD)** → Stripe (credit card)

### ToyyibPay Flow
1. POST `/api/checkout/create-session` with `product: "bm"` → returns ToyyibPay bill URL
2. User pays on ToyyibPay
3. Callback → `POST /api/payment/toyyibpay-callback` with billcode → marks paid
4. User clicks download → `POST /api/payment/toyyibpay-download`

### Stripe Flow
1. POST `/api/checkout/create-session` with `product: "en"` → returns Stripe Checkout URL
2. User pays on Stripe
3. Webhook → `POST /api/webhooks/stripe` (checkout.session.completed) → marks paid
4. Stripe surcharge: 3% + RM 2.00 added to base price
5. User clicks download → `POST /api/checkout/session/{id}/request-download`

### Affiliate Conversion Tracking
- Checkout includes `referralCode` in request body
- On payment success, `AffiliateService.trackConversion()` records commission (default 50%)
- Creates `ReferralConversion` record with status "pending"
- Updates affiliate `total_earned`
- Double-tracking prevented by `affiliate_id` null check

---

## 7. Security

- All public API paths are `permitAll()` in SecurityConfig
- CSRF disabled for all API paths (stateless session)
- Passwords hashed with BCrypt
- CORS restricted to `frontend.url` (configurable via `frontend.allowed-origins`)
- Stripe webhook signature verified
- Debug endpoints protected by `X-Debug-Token` header
- E-book download tokens expire after 24 hours (configurable), max downloads enforced

---

## 8. Local Development

```bash
# Prerequisites
git checkout fix/local-dev-cors
# If master is ahead: git rebase master

# Start database (Docker)
docker compose up -d postgres

# Start backend
./scripts/start-local.sh
# Backend: http://localhost:8080

# Start frontend (separate terminal)
cd frontend && npm run dev
# Frontend: http://localhost:5173
```

### Affiliate Test Login
- Username: `aishaaffiliate` or email: `aishaaffiliate@example.com`
- Password: `AishaAffiliate123!`
- Role: affiliate
- Test cards: Stripe `4242 4242 4242 4242`, ToyyibPay sandbox

---

## 9. Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/psoriasis_db` | JDBC connection string |
| `DB_USERNAME` | `postgres` | DB user |
| `DB_PASSWORD` | `password` | DB password |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend URL (for CORS + links). Production should be `https://freefrompsoriasis.com` |
| `FRONTEND_ALLOWED_ORIGINS` | defaults to FRONTEND_URL | Comma-separated CORS origins. Production should include `https://freefrompsoriasis.com,https://www.freefrompsoriasis.com` |
| `STRIPE_SECRET_KEY` | `sk_test_...` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook signing secret |
| `STRIPE_PRICE_BM` | `price_...` | Stripe price ID for BM product |
| `STRIPE_PRICE_EN` | `price_...` | Stripe price ID for EN product |
| `JWT_SECRET` | — | JWT signing key |
| `MAIL_USERNAME` | — | SMTP username |
| `MAIL_PASSWORD` | — | SMTP password |
| `TOYYIPAY_USER_SECRET_KEY` | — | ToyyibPay API key |
| `TOYYIPAY_CATEGORY_CODE` | — | ToyyibPay category |
| `TOYYIPAY_BASE_URL` | `https://dev.toyyibpay.com` | ToyyibPay API base |
| `TOYYIPAY_CALLBACK_URL` | `http://localhost:8080/api/payment/toyyipay-callback` | Callback URL |
| `EBOOK_DOWNLOAD_BASE_URL` | `http://localhost:8080/api/ebook/download` | Base for download links |
| `DEBUG_EMAIL_TOKEN` | — | Token for debug endpoints |
| `TELEGRAM_SUPPORT_URL` | — | Telegram group invite link |

---

## 10. Deployment

### Frontend (Vercel)
```bash
cd frontend && npm run build && vercel --prod
```

Production domain:

- `freefrompsoriasis.com`
- `www.freefrompsoriasis.com`

### Backend (Fly.io)
```bash
fly secrets import < .env
fly deploy
```
