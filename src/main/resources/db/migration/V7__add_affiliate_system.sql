CREATE TABLE IF NOT EXISTS affiliates (
    id              BIGSERIAL       PRIMARY KEY,
    name            VARCHAR(255)    NOT NULL,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    referral_code   VARCHAR(50)     NOT NULL UNIQUE,
    bio             TEXT,
    avatar_url      VARCHAR(500),
    social_links    TEXT,
    payment_info    TEXT,
    commission_rate DECIMAL(5,4)    NOT NULL DEFAULT 0.5000,
    total_earned    DECIMAL(10,2)   NOT NULL DEFAULT 0,
    total_paid      DECIMAL(10,2)   NOT NULL DEFAULT 0,
    status          VARCHAR(20)     NOT NULL DEFAULT 'active',
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referral_conversions (
    id                  BIGSERIAL       PRIMARY KEY,
    affiliate_id        BIGINT          NOT NULL REFERENCES affiliates(id),
    payment_order_id    BIGINT          NOT NULL REFERENCES payment_orders(id),
    order_amount        DECIMAL(10,2)   NOT NULL,
    commission_rate     DECIMAL(5,4)    NOT NULL,
    commission_amount   DECIMAL(10,2)   NOT NULL,
    status              VARCHAR(20)     NOT NULL DEFAULT 'pending',
    created_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
    paid_at             TIMESTAMP
);

ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS referral_code VARCHAR(50);
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS affiliate_id BIGINT REFERENCES affiliates(id);
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,4);
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(10,2);
