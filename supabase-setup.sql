-- Supabase Database Setup for Mockr MVP
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: User Usage Tracking (Rate Limiting)
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID PRIMARY KEY DEFAULT uuid_gen_random(),
  user_id TEXT NOT NULL,  -- Clerk user ID
  comics_generated INTEGER DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_usage_user_date ON user_usage(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_usage_date ON user_usage(date);

-- Table 2: User Feedback Collection
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_gen_random(),
  user_id TEXT NOT NULL,  -- Clerk user ID
  email TEXT,  -- User email from Clerk
  feedback_type TEXT NOT NULL,  -- 'general', 'bug', 'feature_request'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),  -- 1-5 stars
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);

-- Table 3: User Registration Tracking (for 100 user cap)
CREATE TABLE IF NOT EXISTS user_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_gen_random(),
  user_id TEXT UNIQUE NOT NULL,  -- Clerk user ID
  email TEXT,  -- User email
  registration_number INTEGER GENERATED ALWAYS AS IDENTITY,  -- Auto-increment for user #
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_registrations_user_id ON user_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_registrations_created_at ON user_registrations(created_at);

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at on user_usage changes
DROP TRIGGER IF EXISTS update_user_usage_updated_at ON user_usage;
CREATE TRIGGER update_user_usage_updated_at
    BEFORE UPDATE ON user_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow service role (backend) to access everything
CREATE POLICY "Service role can do everything on user_usage"
  ON user_usage
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on user_feedback"
  ON user_feedback
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on user_registrations"
  ON user_registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies: Allow anon role (frontend) to read/write their own data
CREATE POLICY "Users can view their own usage"
  ON user_usage
  FOR SELECT
  TO anon
  USING (true);  -- We'll validate user_id in the API

CREATE POLICY "Users can insert their own feedback"
  ON user_feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);  -- We'll validate user_id in the API

-- Helpful Views for Admin (You can query these directly)

-- View: Daily usage statistics
CREATE OR REPLACE VIEW daily_usage_stats AS
SELECT
  date,
  COUNT(DISTINCT user_id) as active_users,
  SUM(comics_generated) as total_comics,
  AVG(comics_generated) as avg_comics_per_user,
  MAX(comics_generated) as max_comics_by_user
FROM user_usage
GROUP BY date
ORDER BY date DESC;

-- View: User feedback summary
CREATE OR REPLACE VIEW feedback_summary AS
SELECT
  feedback_type,
  COUNT(*) as count,
  AVG(rating) as avg_rating,
  COUNT(DISTINCT user_id) as unique_users
FROM user_feedback
GROUP BY feedback_type;

-- View: Top users by comic generation
CREATE OR REPLACE VIEW top_users AS
SELECT
  user_id,
  SUM(comics_generated) as total_comics,
  COUNT(DISTINCT date) as days_active,
  MAX(date) as last_active
FROM user_usage
GROUP BY user_id
ORDER BY total_comics DESC
LIMIT 20;

-- Grant permissions to views
GRANT SELECT ON daily_usage_stats TO anon, service_role;
GRANT SELECT ON feedback_summary TO anon, service_role;
GRANT SELECT ON top_users TO anon, service_role;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Mockr MVP Database Setup Complete!';
  RAISE NOTICE 'Tables created: user_usage, user_feedback, user_registrations';
  RAISE NOTICE 'Views created: daily_usage_stats, feedback_summary, top_users';
END $$;
