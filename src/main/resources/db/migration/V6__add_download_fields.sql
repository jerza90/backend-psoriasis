ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS download_token VARCHAR(500);
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS download_count INT DEFAULT 0;
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS max_downloads INT DEFAULT 3;
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMP;
