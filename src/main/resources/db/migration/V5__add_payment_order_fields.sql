ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS decline_reason VARCHAR(255);
ALTER TABLE payment_orders ADD COLUMN IF NOT EXISTS refunded_date TIMESTAMP;
