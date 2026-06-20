DROP TABLE IF EXISTS toyyipay_orders;

CREATE TABLE payment_orders (
    id                      BIGSERIAL       PRIMARY KEY,
    order_ref               VARCHAR(255),
    payment_method          VARCHAR(50),
    customer_name           VARCHAR(255),
    customer_email          VARCHAR(255),
    customer_phone          VARCHAR(50),
    product_name            VARCHAR(255),
    amount                  DECIMAL(10,2),
    currency                VARCHAR(10),
    payment_status          VARCHAR(50),
    status                  VARCHAR(50),

    bill_code               VARCHAR(255),
    stripe_session_id       VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    ref_no                  VARCHAR(255),
    payment_channel         VARCHAR(100),
    transaction_charge      DECIMAL(10,2),
    nett_received           DECIMAL(10,2),
    status_reason           VARCHAR(255),
    decline_reason          VARCHAR(255),
    payment_date            TIMESTAMP,
    refunded_date           TIMESTAMP,
    created_date            TIMESTAMP,
    expired_date            TIMESTAMP
);
