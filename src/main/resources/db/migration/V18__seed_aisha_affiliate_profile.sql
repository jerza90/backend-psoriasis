-- Ensure the local affiliate login account also has a matching affiliate profile row.
-- This keeps the dashboard lookup working for the documented test account.

UPDATE affiliates
SET
    name = 'Aisha Affiliate',
    email = 'aishaaffiliate@example.com',
    referral_code = 'AISYAH01',
    bio = 'Bekas pesakit psoriasis yang berkongsi perjalanan pemulihan dan sokongan komuniti.',
    avatar_url = 'https://i.pravatar.cc/300?u=aishaaffiliate',
    social_links = '{"instagram":"@aishaaffiliate","tiktok":"@aisha.psoriasis"}',
    payment_info = '{"bank":"Maybank","account":"****1234"}',
    condition_label = 'Psoriasis fighter',
    status = 'active',
    updated_at = NOW()
WHERE email = 'aishaaffiliate@example.com'
   OR referral_code = 'AISYAH01';

INSERT INTO affiliates (
    name,
    email,
    referral_code,
    bio,
    avatar_url,
    social_links,
    payment_info,
    commission_rate,
    total_earned,
    total_paid,
    status,
    created_at,
    updated_at,
    condition_label
) SELECT
    'Aisha Affiliate',
    'aishaaffiliate@example.com',
    'AISYAH01',
    'Bekas pesakit psoriasis yang berkongsi perjalanan pemulihan dan sokongan komuniti.',
    'https://i.pravatar.cc/300?u=aishaaffiliate',
    '{"instagram":"@aishaaffiliate","tiktok":"@aisha.psoriasis"}',
    '{"bank":"Maybank","account":"****1234"}',
    0.5000,
    0,
    0,
    'active',
    NOW(),
    NOW(),
    'Psoriasis fighter'
WHERE NOT EXISTS (
    SELECT 1
    FROM affiliates
    WHERE email = 'aishaaffiliate@example.com'
       OR referral_code = 'AISYAH01'
);
