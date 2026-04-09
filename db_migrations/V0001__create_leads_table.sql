CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  object_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);