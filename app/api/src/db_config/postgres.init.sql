
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE channel as ENUM('Email','Sms');
CREATE TYPE notify_status AS ENUM ('Queued', 'Processing', 'Success','Retrying','Failed');
CREATE TYPE priority_type AS ENUM('HIGH','MEDIUM','LOW');

CREATE TABLE IF NOT EXISTS notifications(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications_channels(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
    channel_type channel NOT NULL,
    payload JSONB NOT NULL,
    notify_priority priority_type NOT NULL,
    notify_status notify_status DEFAULT 'Queued',
    attempt_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()

);

CREATE TABLE IF NOT EXISTS failed_notifications_channels(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notifications_channel_id UUID REFERENCES notifications_channels(id) ON DELETE CASCADE,
    error_message TEXT,
    channel_type channel NOT NULL,
    notify_priority priority_type NOT NULL,
    payload JSONB NOT NULL,
    attempt_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);