-- Backfill the affiliate demo account as a real login user.
-- Login only checks the users table, so affiliate profile seeds also need a matching users row.

INSERT INTO users (
    username,
    email,
    password_hash,
    full_name,
    role,
    enabled,
    created_at,
    updated_at
) VALUES (
    'aishaaffiliate',
    'aishaaffiliate@example.com',
    '$2b$10$TVZ.EzkAbSIGYKrV1si.T.c532EDkmPTIbbz8g49VQwEO3D3eMAN6',
    'Aisha Affiliate',
    'affiliate',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    enabled = true,
    updated_at = NOW();
