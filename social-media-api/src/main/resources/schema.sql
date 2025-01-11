CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION default_uuid()
RETURNS uuid AS $$
BEGIN
RETURN uuid_generate_v4();
END;
$$ LANGUAGE plpgsql;

CREATE TABLE post (
  id UUID PRIMARY KEY DEFAULT default_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment (
     id UUID PRIMARY KEY DEFAULT default_uuid(),
     user_id UUID NOT NULL,
     content TEXT NOT NULL,
     post_id UUID REFERENCES post (id) ON DELETE CASCADE,
     status_id UUID UNIQUE, -- Status ile bire bir ilişki
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comment_status (
    id UUID PRIMARY KEY DEFAULT default_uuid(),
    comment_id UUID UNIQUE REFERENCES comment (id) ON DELETE CASCADE,
    users UUID[] DEFAULT ARRAY[]::UUID[], -- UUID Listesi
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_status (
     id UUID PRIMARY KEY DEFAULT default_uuid(),
     post_id UUID UNIQUE REFERENCES post (id) ON DELETE CASCADE,
     users UUID[] DEFAULT ARRAY[]::UUID[], -- UUID Listesi
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE story (
   id UUID PRIMARY KEY DEFAULT default_uuid(),
   user_id UUID NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
