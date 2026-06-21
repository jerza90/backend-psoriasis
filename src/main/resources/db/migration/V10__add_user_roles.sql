ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user';

UPDATE users
SET role = 'affiliate'
WHERE email IN (
    SELECT email
    FROM affiliates
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
