CREATE TABLE users (
    id              BIGSERIAL       PRIMARY KEY,
    username        VARCHAR(255)    UNIQUE,
    email           VARCHAR(255)    NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,
    full_name       VARCHAR(255),
    enabled         BOOLEAN         NOT NULL DEFAULT false,
    otp_code        VARCHAR(255),
    otp_expiry      TIMESTAMP,
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);
