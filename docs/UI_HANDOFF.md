# UI Design Hand-off — Psoriasis Ebook Web

## 1. Project Overview

A two-brand wellness education platform for people with psoriasis:

- **FreeFromPsoriasis** (English / global) — education-first, iHerb affiliate, lead magnets
- **BebasPsoriasis** (Bahasa Malaysia / local) — existing local ebook & product sales

Users land via content (TikTok, Instagram), opt into a free checklist/guide, then get routed to ebook purchase or product support.

---

## 2. Brand Identity

### Colors (from existing mockup)

| Token | Hex | Usage |
|-------|-----|-------|
| `--ink` | `#17211c` | Body text, headings |
| `--muted` | `#607069` | Secondary text, metadata |
| `--line` | `#d9e2db` | Borders, dividers |
| `--paper` | `#fbfaf6` | Page background |
| `--soft` | `#eef5ef` | Card / panel background |
| `--green` | `#2f6b4f` | Primary brand color, buttons, links |
| `--leaf` | `#8ab17d` | Secondary green accent |
| `--rose` | `#c76d64` | Alert / accent (use sparingly) |
| `--gold` | `#d6a84f` | Highlight / price |
| `--white` | `#ffffff` | White surfaces |

### Typography

- **Font**: Inter (body & headings), system-ui fallback
- **Headings**: Bold (700–900), tight letter-spacing (0)
- **Body**: Regular (400), 1.5 line-height
- **Scale**: Use `clamp()` for responsive sizing

### Tone

Calm, clear, practical, support-first. Never aggressive, fear-based, or cure-claiming.

---

## 3. Pages / Screens

### 3.1 Landing / Hero Page

**Purpose**: First impression — introduce FreeFromPsoriasis mission and capture email.

**Sections**:
- Sticky top bar (brand mark + logo + nav links)
- Hero: tagline + BM ebook description + CTA "Get the BM Ebook"
- Cover mockup (ebook visual placeholder)
- Trust row: "Instant digital download" / "Education-first" / "Not medical advice"
- "What the ebook helps with" (3-column grid: Flare-up reflection, Routine mistakes, Product support)
- "This is for you / This is not for" split panel
- CTA band with price + "Buy on Payhip" button
- Disclaimer footer

**CTA**: "Get the BM Ebook" (scrolls to pricing), "See What Is Inside"

### 3.2 Free Guide / Checklist Page

**Purpose**: Lead magnet — download "Psoriasis Flare-Up Support Checklist"

**Sections**:
- Title + description
- 7 support areas (Skin-barrier care, Stress, Sleep, Food, Gut, Immune, Supplements)
- Email capture form (name + email)
- Download link after email submit
- Soft CTA to move to ebook purchase

**CTA**: "Download Free Checklist" → email form → PDF download

### 3.3 Ebook Product Page

**Purpose**: Sell the BM ebook (and later English ebook)

**Sections**:
- Ebook cover + title ("Panduan Sokongan Psoriasis")
- What's inside (bullet points)
- Price (RM XX)
- Purchase button (links to Payhip)
- FAQ / disclaimer

**CTA**: "Buy on Payhip" (external link)

### 3.4 Ebook Thank You / Download Page

**Purpose**: Post-purchase page with download link

**Sections**:
- Confirmation message
- Download button
- What to do next (reading guide)
- Product support / affiliate recommendations (if applicable)

### 3.5 Product Recommendations Page

**Purpose**: iHerb affiliate product suggestions after education

**Sections**:
- Product categories (Skin barrier, Immune, Gut, Stress/Sleep)
- Each product: name, ingredients, dose, safety notes
- Affiliate disclosure
- "Who this is for / Not for"

**CTA**: "Shop on iHerb" (affiliate link)

### 3.6 Blog / Content Page

**Purpose**: Educational content (posts, carousels)

**Sections**:
- Article list (most recent first)
- Category filter
- Individual article page
- "Checklist" CTA within articles

### 3.7 FAQ Page

**Purpose**: Address common objections

**Questions**:
- Is this a cure? (No)
- Should I stop my medication? (No — speak to doctor)
- What's the difference between BM and English ebook?
- How are products recommended?

---

## 4. User Flows

### Flow A: TikTok → Checklist → Ebook

```
TikTok post → "Comment CHECKLIST" → 
  → User sends DM → gets free checklist link
  → Checklist page → email capture → PDF download
  → Email sequence (nurture) → ebook offer
  → Ebook product page → Payhip checkout
  → Thank you page → download
```

### Flow B: Direct Ad → Ebook Purchase

```
Ad/Content → Ebook product page
  → "Buy on Payhip" → Payhip checkout
  → Thank you page → download
  → Follow-up email with product recommendations
```

### Flow C: Blog → Checklist → Affiliate Products

```
Blog article → "Get the free checklist"
  → Checklist email capture → PDF
  → Email nurture → Product recommendation page
  → iHerb affiliate link
```

---

## 5. Key Features

| Feature | Priority | Notes |
|---------|----------|-------|
| Responsive design (mobile-first) | P0 | 90%+ traffic from mobile |
| Email capture form | P0 | For checklist downloads |
| Payhip purchase redirect | P0 | External checkout |
| Ebook PDF download after purchase | P0 | Secure delivery |
| Product recommendation catalog | P1 | iHerb affiliate |
| Blog / content system | P1 | Education articles |
| FAQ section | P1 | Reduce DM volume |
| Multi-language toggle (BM / EN) | P2 | Future |
| Quiz / assessment tool | P2 | "Which product for me?" |

---

## 6. API Endpoints (Available from Backend)

Base URL: `http://localhost:8080/api`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Send OTP to email for registration |
| POST | `/api/auth/verify-registration` | Verify OTP + create account |
| POST | `/api/auth/forgot-password` | Send OTP to email for password reset |
| POST | `/api/auth/reset-password` | Verify OTP + reset password |
| POST | `/api/users` | Register user |
| GET | `/api/users/username/{username}` | Get user by username |
| GET | `/api/users/email/{email}` | Get user by email |
| GET | `/api/users/exists/username/{username}` | Check username availability |
| GET | `/api/users/exists/email/{email}` | Check email availability |

---

## 7. Design Files & Assets

### Existing Assets
- `/Users/jerza/Documents/Affiliate-Free-From-Psoriasis/bm-ebook-product-page-mockup.html`
  - Live mockup with all CSS variables and layout patterns
  - Color palette and typography defined in `:root`
  - Fully responsive at 860px breakpoint

### SVG Graphics
- `/Users/jerza/Documents/Affiliate-Free-From-Psoriasis/assets/`
  - `gut-facts-english.svg` — Gut health infographic
  - `a1-a2-casein-comparison.svg` — Dairy comparison graphic

### Ebook Content
- `/Users/jerza/Documents/Affiliate-Free-From-Psoriasis/ENGLISH_EBOOK_DRAFT.md` — English ebook draft
- `/Users/jerza/Documents/Affiliate-Free-From-Psoriasis/ENGLISH_EBOOK_PLAN.md` — English ebook outline

---

## 8. Tech Stack (Frontend)

Follow SediaNikah's stack:

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Routing | react-router-dom |
| Icons | Lucide icons |
| Styling | CSS modules or Tailwind (designer's choice) |
| Deployment | Vercel |

---

## 9. Content Strategy Notes

### 7 Content Pillars
1. Psoriasis basics
2. Immune system & inflammation
3. Gut, food, and triggers
4. Stress, sleep, and recovery
5. Skin barrier and daily care
6. Supplement education
7. Proof and journey

### Weekly Content Mix
- 2 education posts
- 1 checklist or carousel
- 1 myth-busting post
- 1 personal or proof-based story
- 1 soft CTA for free guide

### Tone Rules
- Do: "may support", "can help you review", "results vary", "wellness education"
- Don't: "cure", "guaranteed", "heal permanently", "stop medication"

---

## 10. Delivery & Contact

- Project repo: `/Users/jerza/personal/psoriasis-backend`
- Business docs: `/Users/jerza/Documents/Affiliate-Free-From-Psoriasis/`
- Start with the existing HTML mockup and adapt for React components
- Mobile-first responsive design
- Priority pages: Landing, Checklist capture, Ebook product page
