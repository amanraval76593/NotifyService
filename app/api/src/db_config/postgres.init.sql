
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE channel as ENUM('Email','Sms');
CREATE TYPE notify_status AS ENUM ('Queued', 'Processing', 'Success', 'Failed');

CREATE TABLE IF NOT EXISTS notifications(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    channel_type channel DEFAULT 'Email',
    notify_status notify_status DEFAULT 'Queued',
    create_at  TIMESTAMPTZ DEFAULT NOW()
)