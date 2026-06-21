# Affiliate Dashboard

This project now gives each affiliate:

- A unique ebook referral link
- Editable public profile details
- Editable story details
- Editable blog teaser/details
- A public affiliate page with profile, tips, guide, and progress sections

## Branch Note

All long-term affiliate-related work should continue on the `affiliateV.10` branch unless you explicitly decide to rename or split it later.

## Referral Link

The backend still tracks the checkout referral internally, but the dashboard now shares the public affiliate page instead of the raw checkout URL.

```text
/affiliate/{referralCode}
```

Example in local dev:

```text
http://localhost:5173/affiliate/AISHAAFF
```

## Editable Fields

The affiliate dashboard can update:

- `name`
- `avatarUrl`
- `bio`
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
/affiliate/AISHAAFF
```

## Local Test Account

- Username: `aishaaffiliate`
- Email: `aishaaffiliate@example.com`
- Password: `AishaAffiliate123!`
- Role: `affiliate`
- Referral code: `AISHAAFF`
