ALTER TABLE affiliates
    ADD COLUMN IF NOT EXISTS condition_label TEXT;
