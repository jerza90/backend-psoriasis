-- Seed 10 contoh affilator untuk data demo / development.
-- Idempotent: jika email sudah wujud, insert diabaikan (ON CONFLICT DO NOTHING).
-- referral_code dijana deterministik (prefix nama + suffix) supaya senang dirujuk.

-- 1. Aisyah
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Aisyah Rahman', 'aisyah.affiliate@example.com', 'AISYAH01',
    'Bekas pesakit psoriasis selama 8 tahun. Kini berkongsi perjalanan pemulihan dengan komuniti Bebas Psoriasis.',
    'https://i.pravatar.cc/300?u=aisyah',
    '{"instagram":"@aisyah.bebsapasori","tiktok":"@aisyahpsoriasis"}',
    '{"bank":"Maybank","account":"****1234"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 2. Faizal
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Faizal Ibrahim', 'faizal.affiliate@example.com', 'FAIZAL02',
    'Coach kesihatan pemakanan. Membantu ramai klien menguruskan psoriasis melalui diet.',
    'https://i.pravatar.cc/300?u=faizal',
    '{"instagram":"@faizal.k","tiktok":"@coachfaizal"}',
    '{"bank":"CIMB","account":"****5678"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 3. Norliza
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Norliza Hashim', 'norliza.affiliate@example.com', 'NORLIZA1',
    'Ibu rumah yang berjaya mengatasi psoriasis selepas melahirkan anak ke-3. Ingin memberi harapan kepada ibu-ibu lain.',
    'https://i.pravatar.cc/300?u=norliza',
    '{"instagram":"@norliza.peaceful"}',
    '{"bank":"Bank Islam","account":"****9012"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 4. Daniel
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Daniel Wong', 'daniel.affiliate@example.com', 'DANIEL01',
    'Content creator fokus topik kesihatan kulit. Berasal dari Kuala Lumpur.',
    'https://i.pravatar.cc/300?u=daniel',
    '{"instagram":"@danielskin","tiktok":"@danielskindiary"}',
    '{"bank":"Public Bank","account":"****3456"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 5. Sharifah
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Sharifah Aini', 'sharifah.affiliate@example.com', 'SHARIF01',
    'Guru tadika yang berjaya menyembuhkan psoriasis kepala secara semula jadi.',
    'https://i.pravatar.cc/300?u=sharifah',
    '{"instagram":"@sharifah.aini"}',
    '{"bank":"Maybank","account":"****7890"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 6. Karthik
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Karthik Raj', 'karthik.affiliate@example.com', 'KARTHIK1',
    'Ahli farmasi yang meminati pendekatan holistik untuk psoriasis. Berkongsi tips dari sudut saintifik.',
    'https://i.pravatar.cc/300?u=karthik',
    '{"instagram":"@pharma.karthik","tiktok":"@karthik.pso"}',
    '{"bank":"RHB","account":"****2345"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 7. Mariam
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Mariam Yusof', 'mariam.affiliate@example.com', 'MARIAM01',
    'Penulis blog mengenai hidup dengan penyakit autoimun. Berbangga menjadi sebahagian dari komuniti Bebas Psoriasis.',
    'https://i.pravatar.cc/300?u=mariam',
    '{"instagram":"@mariam.writes","tiktok":"@mariamys"}',
    '{"bank":"Hong Leong","account":"****6789"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 8. Azman
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Azman Jalal', 'azman.affiliate@example.com', 'AZMAN01',
    'Bekas atlet yang menghidap guttate psoriasis selepas jangkitan strep. Kini aktif menyokong pesakit lelaki.',
    'https://i.pravatar.cc/300?u=azman',
    '{"instagram":"@azman.fitness","tiktok":"@coachazman"}',
    '{"bank":"Maybank","account":"****0123"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 9. Priya
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Priya Nair', 'priya.affiliate@example.com', 'PRIYAN1',
    'Dietitian berdaftar yang mengkhusus dalam diet anti-keradangan untuk psoriasis dan ekzema.',
    'https://i.pravatar.cc/300?u=priya',
    '{"instagram":"@priya.dietitian","tiktok":"@dietpriya"}',
    '{"bank":"CIMB","account":"****4567"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- 10. Hafizah
INSERT INTO affiliates (
    name, email, referral_code, bio, avatar_url, social_links, payment_info,
    commission_rate, total_earned, total_paid, status, created_at, updated_at
) VALUES (
    'Hafizah Osman', 'hafizah.affiliate@example.com', 'HAFIZA1',
    'Pelajar ijazah sarjana muda psoriasis. Ingin membantu golongan muda memahami penyakit ini.',
    'https://i.pravatar.cc/300?u=hafizah',
    '{"instagram":"@hafizah.pso","tiktok":"@hafizah.stories"}',
    '{"bank":"Bank Rakyat","account":"****8901"}',
    0.5000, 0, 0, 'active', NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- Sinkronkan role: jika affilator seed ini juga ada di users, berikan role 'affiliate'
-- (selaras dengan corak V10__add_user_roles.sql)
UPDATE users
SET role = 'affiliate'
WHERE email IN (
    SELECT email FROM affiliates
)
AND role <> 'affiliate';

-- Reset sequence supaya insert seterusnya tidak berlaku konflik ID
SELECT setval(
    'affiliates_id_seq',
    GREATEST((SELECT MAX(id) FROM affiliates), 1),
    true
);
