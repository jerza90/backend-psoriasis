# Psoriasis-Backend — Project Documentation

## 1. Project Overview

A two-brand wellness education platform for people with psoriasis:

- **FreeFromPsoriasis** (English / global) — education-first, affiliate product recommendations, lead magnets
- **BebasPsoriasis** (Bahasa Malaysia / local) — BM e-book sales & product support

Users land via content (TikTok, Instagram), opt into a free checklist, then get routed to e-book purchase or product support pages.

---

## 2. Brand Identity

| Token | Hex | Usage |
|-------|-----|-------|
| `--ink` | `#17211c` | Body text, headings |
| `--muted` | `#607069` | Secondary text, metadata |
| `--line` | `#d9e2db` | Borders, dividers |
| `--paper` | `#fbfaf6` | Page background |
| `--soft` | `#eef5ef` | Card / panel background |
| `--green` | `#2f6b4f` | Primary brand color, buttons, links |
| `--leaf` | `#8ab17d` | Secondary green accent |
| `--rose` | `#c76d64` | Alert / accent |
| `--gold` | `#d6a84f` | Highlight / price |

---

## 3. Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool / dev server |
| react-router-dom | 7 | Routing |
| i18next | 26 | Internationalization (EN + MS) |
| lucide-react | 1 | Icons |
| Tailwind CSS | 4 | Styling |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Language |
| Spring Boot | 3.2.0 | REST API framework |
| Spring Data JPA | 3.2.0 | ORM / database |
| Spring Security | 3.2.0 | Auth / JWT |
| PostgreSQL | 16 | Database |
| Redis | - | Caching |
| Lombok | 1.18.30 | Boilerplate reduction |
| MapStruct | 1.5.5 | Object mapping |

### Infrastructure

- **Frontend**: Vercel
- **Backend**: Fly.io
- **Database**: PostgreSQL 16 (Docker local / Fly.io cloud)
- **Email**: SendGrid

---

## 4. Frontend Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | LandingPage | Main hero with e-book promotion |
| `/checkout` | CheckoutPage | Digital product checkout (payment gateway placeholder) |
| `/thank-you` | ThankYouPage | Post-purchase download page |
| `/tips` | TipsPage | Tips & education articles |
| `/tips/ebook` | EbookGalleryPage | E-book gallery/detail |
| `/products` | ProductsPage | Supplement product recommendations |
| `/checklist` | ChecklistPage | Free flare-up checklist capture |
| `/faq` | FaqPage | Frequently asked questions |
| `/blog` | BlogPage | Education blog listing |
| `/blog/:id` | BlogPostPage | Individual blog post |

### Key Components

| Component | Usage |
|-----------|-------|
| `Topbar` | Navigation bar (all pages) |
| `Footer` | Site footer (all pages) |
| `HeroProduct` | Featured supplement product (ProductsPage) |
| `ProductImage` | Product image with gradient fallback |
| `TestimonialCarousel` | User success story carousel (LandingPage) |

---

## 5. E-Book Product

### Details
- **Title**: Free From Psoriasis Since 2021
- **Language**: Bahasa Malaysia (BM)
- **Pages**: 62
- **Format**: Instant digital download (PDF)
- **Price**: RM 27 (launch), original RM 47

### Three Phases
1. **Phase 1 — The Healing Crisis**: Navigating the Herxheimer reaction when diet/supplements change
2. **Phase 2 — Progressive Skin Improvement**: Diet, routine, and lifestyle shifts that work
3. **Phase 3 — Stabilize & Stay Free**: Long-term skin protection without steroid dependence

### Target Audience
- People with psoriasis or recurring skin flare-ups
- Those confused about triggers and routines
- BM-speaking audience wanting education before purchasing products

---

## 6. Supplement Products

Nine products across 7 categories:

| Product | Category | Price |
|---------|----------|-------|
| Dnd SunTerra D3K2 + Omega 3,6,7,9 | Essential Nutrients | - |
| Vitamin D3 + K2 | Skin Barrier & Immune | iHerb |
| Omega-3 (Fish Oil) | Inflammatory Response | iHerb |
| Zinc Picolinate | Skin Healing & Immune | iHerb |
| Quercetin | Mast Cell & Histamine | iHerb |
| Probiotic (Multi-Strain) | Gut-Skin Axis | iHerb |
| Magnesium Glycinate | Stress & Sleep | iHerb |
| Ashwagandha (KSM-66) | Stress & Cortisol | iHerb |
| Curcumin (BioPerine) | Inflammatory Response | iHerb |

All physical products are affiliate-linked to iHerb / Shopee (no on-site checkout for physical goods).

---

## 7. Backend API

### Base URL: `/api`

### 7.1 Existing Endpoints

#### Authentication (Email + OTP)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Send 6-digit OTP to email for registration |
| `POST` | `/api/auth/verify-registration` | Verify OTP + create account (password, fullName) |
| `POST` | `/api/auth/forgot-password` | Send OTP to email for password reset |
| `POST` | `/api/auth/reset-password` | Verify OTP + reset password |

#### Users

| Method | Path | Description | Request | Response |
|--------|------|-------------|---------|----------|
| `POST` | `/api/users` | Register new user | `User` JSON | `User` (201) |
| `GET` | `/api/users/username/{username}` | Get user by username | - | `User` (200/404) |
| `GET` | `/api/users/email/{email}` | Get user by email | - | `User` (200/404) |
| `GET` | `/api/users/exists/username/{username}` | Check username availability | - | `boolean` |
| `GET` | `/api/users/exists/email/{email}` | Check email availability | - | `boolean` |

### 7.2 Planned / Future Endpoints

#### Authentication

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/login` | Login, returns JWT |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `POST` | `/api/auth/logout` | Invalidate token |

#### Checkout / Payments

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/checkout/create` | Create payment session |
| `GET` | `/api/checkout/status/{id}` | Check payment status |
| `POST` | `/api/webhooks/payment` | Payment gateway webhook |
| `GET` | `/api/orders` | List user orders |
| `GET` | `/api/orders/{id}` | Get order details |

#### E-Book

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/ebook` | Get e-book metadata |
| `GET` | `/api/ebook/download/{orderId}` | Download e-book PDF (after purchase) |

#### Products

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/products` | List all products (i18n support) |
| `GET` | `/api/products/{id}` | Get single product |
| `GET` | `/api/products/category/{category}` | Filter products by category |

#### Blog

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/blog` | List blog posts (paginated) |
| `GET` | `/api/blog/{id}` | Get single blog post |

#### Newsletter / Email

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/newsletter/subscribe` | Subscribe email |
| `POST` | `/api/contact` | Contact form submission |

#### Testimonials

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/testimonials` | List success stories |
| `POST` | `/api/testimonials` | Submit testimonial (moderated) |

#### Admin

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/admin/orders` | List all orders |
| `GET` | `/api/admin/users` | List all users |
| `GET` | `/api/admin/analytics` | Sales & visitor stats |

---

## 8. Database Schema

### Current: `users` table

```sql
CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    username      VARCHAR(255) UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(255),
    enabled       BOOLEAN DEFAULT FALSE,
    otp_code      VARCHAR(6),
    otp_expiry    TIMESTAMP,
    created_at    TIMESTAMP,
    updated_at    TIMESTAMP
);
```

### Planned Tables

#### `orders`
```sql
CREATE TABLE orders (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id),
    product_type    VARCHAR(50) NOT NULL,  -- 'ebook'
    product_id      VARCHAR(100) NOT NULL,
    amount          DECIMAL(10,2) NOT NULL,
    currency        VARCHAR(3) DEFAULT 'MYR',
    status          VARCHAR(50) NOT NULL,  -- 'pending', 'completed', 'failed', 'refunded'
    payment_gateway VARCHAR(50),           -- 'payhip', 'stripe', 'toyyibpay'
    payment_id      VARCHAR(255),
    email           VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);
```

#### `order_items`
```sql
CREATE TABLE order_items (
    id          BIGSERIAL PRIMARY KEY,
    order_id    BIGINT REFERENCES orders(id),
    item_type   VARCHAR(50) NOT NULL,
    item_id     VARCHAR(100) NOT NULL,
    item_name   VARCHAR(255),
    quantity    INT DEFAULT 1,
    unit_price  DECIMAL(10,2),
    total_price DECIMAL(10,2)
);
```

#### `products`
```sql
CREATE TABLE products (
    id              VARCHAR(100) PRIMARY KEY,
    name_en         VARCHAR(255),
    name_ms         VARCHAR(255),
    brand           VARCHAR(255),
    category_en     VARCHAR(100),
    category_ms     VARCHAR(100),
    short_desc_en   TEXT,
    short_desc_ms   TEXT,
    why_it_helps_en TEXT,
    why_it_helps_ms TEXT,
    how_it_works_en TEXT,
    how_it_works_ms TEXT,
    dosage          VARCHAR(255),
    best_time       VARCHAR(255),
    evidence_level  VARCHAR(50),
    evidence_note_en TEXT,
    evidence_note_ms TEXT,
    affiliate_url   VARCHAR(500),
    is_hero         BOOLEAN DEFAULT FALSE,
    rating          INT DEFAULT 0,
    image_url       VARCHAR(500),
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);
```

#### `blog_posts`
```sql
CREATE TABLE blog_posts (
    id            VARCHAR(100) PRIMARY KEY,
    title_en      VARCHAR(255),
    title_ms      VARCHAR(255),
    excerpt_en    TEXT,
    excerpt_ms    TEXT,
    content_en    TEXT,
    content_ms    TEXT,
    category      VARCHAR(100),
    image_url     VARCHAR(500),
    published     BOOLEAN DEFAULT FALSE,
    published_at  TIMESTAMP,
    created_at    TIMESTAMP,
    updated_at    TIMESTAMP
);
```

#### `testimonials`
```sql
CREATE TABLE testimonials (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255),
    text_en         TEXT,
    text_ms         TEXT,
    image_url       VARCHAR(500),
    progress_images TEXT[],      -- array of image URLs
    condition_stage VARCHAR(100),
    duration_label  VARCHAR(100),
    tips_en         TEXT[],
    tips_ms         TEXT[],
    is_published    BOOLEAN DEFAULT FALSE,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMP
);
```

#### `newsletter_subscribers`
```sql
CREATE TABLE newsletter_subscribers (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    name        VARCHAR(255),
    source      VARCHAR(100),  -- 'checklist', 'checkout', 'landing'
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP
);
```

---

## 9. Payment Integration

### Digital Products (E-Book) — Stripe Checkout

**Status:** Implemented (backend + frontend)

- **Gateway**: Stripe Checkout (hosted payment page)
- **Flow**:
  1. User fills name + email on CheckoutPage
  2. Form submit calls `POST /api/checkout/create-session`
  3. Backend creates Stripe Checkout Session with surcharge (3% + RM 2.00)
  4. User redirected to Stripe hosted payment page
  5. On success → `/thank-you?session_id={CHECKOUT_SESSION_ID}`
  6. On cancel → `/checkout?canceled=true`
  7. ThankYouPage verifies session via `GET /api/checkout/session/{sessionId}`
  8. Download button calls `GET /api/checkout/session/{sessionId}/download` → serves PDF
  9. Stripe webhook `checkout.session.completed` → `POST /api/webhooks/stripe`

- **Surcharge formula:** `total = baseAmount + (baseAmount * rate) + fixedFee`
  - RM 27.00 + (RM 27.00 * 0.03) + RM 2.00 = RM 29.81 approx. RM 29.90
  - config: `app.stripe.surcharge-rate=0.03`, `app.stripe.surcharge-fixed=2.00`

- **Download flow:** Server-side verification of Stripe Session `payment_status=paid` before serving PDF from `src/main/resources/static/ebook/`

- **Backend endpoints (all under `/api/checkout`):**
  - `POST /create-session` — creates Stripe Checkout session
  - `GET /session/{sessionId}` — retrieves session status
  - `GET /session/{sessionId}/download` — serves PDF if paid

### Physical Products (Supplements)
- Affiliate links to iHerb
- No on-site checkout or payment processing

### Configuration Properties
```
app.stripe.secret-key=sk_test_...
app.stripe.publishable-key=pk_test_...
app.stripe.webhook-secret=whsec_...
app.stripe.surcharge-rate=0.03
app.stripe.surcharge-fixed=2.00
app.stripe.currency=myr
app.stripe.success-url=http://localhost:5173/thank-you?session_id={CHECKOUT_SESSION_ID}
app.stripe.cancel-url=http://localhost:5173/checkout?canceled=true
```

---

## 10. Frontend-Backend Integration

### Current
- Frontend runs on `localhost:5173` (dev) / Vercel (prod)
- Backend runs on `localhost:8080` (dev) / Fly.io (prod)
- Vite proxy forwards `/api/*` from frontend to backend
- Existing API client at `frontend/src/api/client.ts`
- Checkout API at `/api/checkout/create-session` (POST), `/api/checkout/session/{id}` (GET), `/api/checkout/session/{id}/download` (GET)
- Stripe webhook at `/api/webhooks/stripe` (POST)

### Proxy Config (vite.config.ts)
```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

---

## 11. Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build   # outputs to dist/
vercel --prod
```

### Backend (Fly.io)
```bash
./scripts/deploy.sh   # builds with Maven, deploys to Fly.io
```

### Local Development
```bash
# Start database
docker compose up -d

# Start backend
./scripts/start.sh

# Start frontend
./scripts/start-frontend.sh
```

---

## 12. Data Flow

```
User → LandingPage → /checkout → Stripe Checkout → /thank-you?session_id=...
  ↓                                                      ↓
ChecklistPage                              Backend verifies session → Download PDF
  ↓
Email capture → Newsletter
```

```
User → ProductsPage → iHerb/Shopee (affiliate)
                        ↓
                   No on-site payment
```

---

## 13. Future Roadmap

### Phase 1 (Current)
- [x] Landing page with e-book hero
- [x] E-book detail page
- [x] Product recommendation pages (EN + BM)
- [x] Free checklist download
- [x] FAQ page
- [x] Blog (EN + BM)
- [x] User registration API (backend)
- [x] Testimonials carousel
- [x] Checkout page UI (Stripe integration)
- [x] Thank-you page (session verification + download)
- [x] i18n (English + Bahasa Malaysia)

### Phase 2 (Backend Completion)
- [ ] JWT authentication (login/register)
- [x] Payment gateway integration (Stripe Checkout)
- [x] Order management API
- [x] E-book download API (access control via Stripe session)
- [x] Webhook handler for payment callbacks
- [ ] SendGrid email integration (receipt + download link)
- [ ] Admin API (orders, users, analytics)
- [ ] Database migrations (Flyway or Liquibase)

### Phase 3 (Enhancements)
- [ ] Blog CMS (admin panel)
- [ ] Product CMS (manage from backend)
- [ ] Testimonial submission & moderation
- [ ] Newsletter subscription API
- [ ] Analytics dashboard
- [ ] Affiliate link click tracking
- [ ] SEO optimization
- [ ] PWA support

---

## 14. Environment Configuration

### Backend (`application.properties`)

| Property | Description |
|----------|-------------|
| `server.port` | Backend port (8080) |
| `spring.datasource.url` | PostgreSQL connection |
| `app.jwt.secret` | JWT signing secret |
| `app.jwt.access-token-expire-minutes` | Token expiry (30 min) |
| `spring.mail.host` | SMTP host (smtp.sendgrid.net) |
| `spring.mail.port` | SMTP port (587) |
| `spring.mail.username` | SMTP username (apikey for SendGrid) |
| `spring.mail.password` | SMTP password / SendGrid API key |
| `app.email.from-email` | Sender email address |
| `app.iherb.affiliate-id` | iHerb affiliate ID |
| `app.stripe.secret-key` | Stripe API secret key |
| `app.stripe.publishable-key` | Stripe publishable key |
| `app.stripe.webhook-secret` | Stripe webhook signing secret |
| `app.stripe.surcharge-rate` | Stripe fee rate (0.03 = 3%) |
| `app.stripe.surcharge-fixed` | Stripe fixed fee in MYR (2.00) |
| `app.stripe.currency` | Currency code (myr) |
| `app.stripe.success-url` | Redirect URL after successful payment |
| `app.stripe.cancel-url` | Redirect URL after cancelled payment |
| `app.cors.origins` | Allowed CORS origins |

### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

---

## 15. Project Structure

```
psoriasis-backend/
├── frontend/                  # React app
│   ├── src/
│   │   ├── api/              # API client
│   │   ├── components/       # Shared components
│   │   ├── data/             # Static data (products, testimonials)
│   │   ├── i18n/             # Translation files (en, ms)
│   │   ├── pages/            # Route pages
│   │   └── types/            # TypeScript interfaces
│   └── public/
│       └── e-book-landing-pages/  # Images & assets
├── src/                       # Spring Boot backend
│   └── main/java/com/psoriasis/
│       ├── config/            # App config, security
│       ├── controller/        # REST controllers
│       ├── dto/               # Request/response DTOs
│       ├── model/             # JPA entities
│       ├── repository/        # Data repositories
│       └── service/           # Business logic
├── scripts/                   # Deploy & start scripts
├── docs/                      # Documentation
├── docker-compose.yml         # PostgreSQL
├── Dockerfile                 # Spring Boot build
└── pom.xml                    # Maven config
```

---

## 16. Security Notes

- Passwords hashed with BCrypt
- JWT tokens for API authentication (HS256, 30 min expiry)
- CORS restricted to frontend origins
- SQL injection protection via JPA parameterized queries
- Payment processing handled by third-party gateways (no raw card storage)
- Admin endpoints require authentication
- Rate limiting recommended for auth & checkout endpoints

---

## 17. Monitoring & Logging

- Spring Boot Actuator endpoints: `/actuator/health`, `/actuator/info`, `/actuator/metrics`
- JSON logging format
- Prometheus metrics endpoint available (add `micrometer-registry-prometheus` dependency)
- Sentry or similar recommended for error tracking in production
