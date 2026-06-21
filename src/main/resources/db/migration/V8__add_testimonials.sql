CREATE TABLE IF NOT EXISTS testimonials (
    id              BIGSERIAL       PRIMARY KEY,
    affiliate_id    BIGINT          REFERENCES affiliates(id),
    name            VARCHAR(255)    NOT NULL,
    location        VARCHAR(255),
    condition_duration VARCHAR(100),
    categories      TEXT,
    summary         TEXT,
    initial_quote   TEXT,
    result_quote    TEXT,
    featured        BOOLEAN         NOT NULL DEFAULT false,
    avatar_url      VARCHAR(500),
    lang            VARCHAR(10)     NOT NULL DEFAULT 'ms',
    sort_order      INT             NOT NULL DEFAULT 0,
    status          VARCHAR(20)     NOT NULL DEFAULT 'active',
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonial_progress (
    id              BIGSERIAL       PRIMARY KEY,
    testimonial_id  BIGINT          NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
    date_label      VARCHAR(100),
    title           VARCHAR(255),
    description     TEXT,
    notes           TEXT,
    tips            TEXT,
    images          TEXT,
    product_tags    TEXT,
    details         TEXT,
    sort_order      INT             NOT NULL DEFAULT 0,
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_lang ON testimonials(lang);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonial_progress_testimonial ON testimonial_progress(testimonial_id);
