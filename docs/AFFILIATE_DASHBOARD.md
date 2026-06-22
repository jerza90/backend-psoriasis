# Affiliate Dashboard

This project now gives each affiliate:

- A unique ebook referral link
- Editable public profile details
- A selectable journey label for the public badge
- Editable journey/story details
- Editable blog teaser/details
- A public affiliate page with profile, tips, guide, and progress sections
- Image upload for each progress update (via dashboard → progress section) — images displayed on public page

## Branch Note

All long-term affiliate-related work should continue on the `affiliateV.10` branch unless you explicitly decide to rename or split it later.

## Referral Link

The backend still tracks the checkout referral internally, but the dashboard now shares the public affiliate page instead of the raw checkout URL.

```text
/affiliate/{referralCode}
```

Example in local dev:

```text
http://localhost:5173/affiliate/AISYAH01
```

## Editable Fields

The affiliate dashboard can update:

- `name`
- `avatarUrl`
- `bio`
- `conditionLabel`
- `socialLinks`
- `paymentInfo`
- `storyTitle`
- `storySummary`
- `storyBody`
- `blogTitle`
- `blogExcerpt`
- `blogUrl`
- `blogImageUrl`

## API Endpoints

- `GET /api/affiliate/profile?email=...`
- `PUT /api/affiliate/profile?email=...`
- `GET /api/affiliate/public?code=...`

## Public Page

Each affiliate gets a page at:

```text
/affiliate/{referralCode}
```

Example:

```text
/affiliate/AISYAH01
```

## Local Test Account

This account needs matching `users` and `affiliates` rows:
- `users` is required for `/api/auth/login`
- `affiliates` is required for `/affiliate/profile?email=...`

- Username: `aishaaffiliate`
- Email: `aishaaffiliate@example.com`
- Password: `AishaAffiliate123!`
- Role: `affiliate`
- Referral code: `AISYAH01`
- Journey label: `Psoriasis fighter`

### Suggested journey labels

- `Psoriasis fighter`
- `Mom with eczema child`
- `Eczema child`
- `Nail psoriasis`
- `Guttate psoriasis`
