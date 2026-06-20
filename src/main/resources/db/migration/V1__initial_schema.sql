CREATE TABLE products (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255)    NOT NULL,
    description     TEXT,
    slug            VARCHAR(255)    NOT NULL UNIQUE,
    price_usd       DECIMAL(10,2)   NOT NULL,
    stripe_price_id VARCHAR(255),
    r2_file_key     VARCHAR(500),
    is_active       BOOLEAN         NOT NULL DEFAULT true,
    created_at      TIMESTAMP       NOT NULL DEFAULT now()
);

CREATE TABLE orders (
    id                      UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_session_id       VARCHAR(255)    UNIQUE,
    stripe_payment_intent_id VARCHAR(255),
    customer_email          VARCHAR(255)    NOT NULL,
    product_id              UUID            NOT NULL REFERENCES products(id),
    amount_paid             DECIMAL(10,2)   NOT NULL,
    currency                VARCHAR(10)     NOT NULL DEFAULT 'MYR',
    status                  VARCHAR(50)     NOT NULL DEFAULT 'PENDING',
    created_at              TIMESTAMP       NOT NULL DEFAULT now(),
    updated_at              TIMESTAMP       NOT NULL DEFAULT now()
);

CREATE TABLE download_tokens (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID            NOT NULL REFERENCES orders(id),
    token           VARCHAR(500)    NOT NULL UNIQUE,
    expires_at      TIMESTAMP       NOT NULL,
    download_count  INT             NOT NULL DEFAULT 0,
    max_downloads   INT             NOT NULL DEFAULT 3,
    created_at      TIMESTAMP       NOT NULL DEFAULT now()
);

INSERT INTO products (name, description, slug, price_usd, stripe_price_id, r2_file_key)
VALUES (
    'Bebas Psoriasis Since 2021',
    'Panduan lengkap mengatasi krisis penyembuhan & pantangan makanan untuk psoriasis',
    'free-from-psoriasis-guide',
    6.00,
    'price_placeholder',
    'ebooks/FreeFromPsoriasis-Guide.pdf'
);
