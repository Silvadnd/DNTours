-- DN Tours Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ADMIN TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (password: DNTours@Admin2026)
-- You should hash this properly in production
INSERT INTO admins (email, password_hash, name) VALUES 
('admin@dntours.lk', '$2b$10$YourHashedPasswordHere', 'DN Tours Admin')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- USERS TABLE (for DN Your Memory)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MEMORIES TABLE (DN Your Memory Posts)
-- =====================================================
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  caption TEXT NOT NULL,
  location TEXT,
  type TEXT CHECK (type IN ('image', 'video')) DEFAULT 'image',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MEMORY MEDIA TABLE (Images/Videos for memories)
-- =====================================================
CREATE TABLE IF NOT EXISTS memory_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id UUID REFERENCES memories(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')) NOT NULL,
  duration INTEGER, -- For videos, in seconds
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LIKES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id UUID REFERENCES memories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(memory_id, user_id)
);

-- =====================================================
-- COMMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memory_id UUID REFERENCES memories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- REVIEWS TABLE (Customer Reviews)
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  message TEXT NOT NULL,
  tags TEXT[], -- Array of tags like ["Friendly", "Adventure"]
  avatar_url TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FEEL THE VIBE VIDEOS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS vibe_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_created_at ON memories(created_at DESC);
CREATE INDEX idx_memory_media_memory_id ON memory_media(memory_id);
CREATE INDEX idx_likes_memory_id ON likes(memory_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_comments_memory_id ON comments(memory_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_vibe_videos_active ON vibe_videos(is_active);

-- =====================================================
-- FUNCTIONS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update likes count
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE memories 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.memory_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE memories 
    SET likes_count = GREATEST(likes_count - 1, 0)
    WHERE id = OLD.memory_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update comments count
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE memories 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.memory_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE memories 
    SET comments_count = GREATEST(comments_count - 1, 0)
    WHERE id = OLD.memory_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger for likes count
CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_likes_count();

-- Trigger for comments count
CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_comments_count();

-- Trigger for updated_at
CREATE TRIGGER trigger_update_memories_updated_at
BEFORE UPDATE ON memories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vibe_videos ENABLE ROW LEVEL SECURITY;

-- Public read access for approved content (drop if exists first)
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;
DROP POLICY IF EXISTS "Public can view active vibe videos" ON vibe_videos;
DROP POLICY IF EXISTS "Public can view all memories" ON memories;
DROP POLICY IF EXISTS "Public can view all memory media" ON memory_media;
DROP POLICY IF EXISTS "Public can view all users" ON users;
DROP POLICY IF EXISTS "Public can view all likes" ON likes;
DROP POLICY IF EXISTS "Public can view all comments" ON comments;
DROP POLICY IF EXISTS "Anyone can create memories" ON memories;
DROP POLICY IF EXISTS "Anyone can upload media" ON memory_media;
DROP POLICY IF EXISTS "Anyone can like" ON likes;
DROP POLICY IF EXISTS "Anyone can comment" ON comments;
DROP POLICY IF EXISTS "Anyone can submit reviews" ON reviews;

CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can view active vibe videos" ON vibe_videos
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view all memories" ON memories
  FOR SELECT USING (true);

CREATE POLICY "Public can view all memory media" ON memory_media
  FOR SELECT USING (true);

CREATE POLICY "Public can view all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Public can view all likes" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Public can view all comments" ON comments
  FOR SELECT USING (true);

-- Allow anyone to insert (for now - you can add auth later)
CREATE POLICY "Anyone can create memories" ON memories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can upload media" ON memory_media
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can like" ON likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can comment" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update and delete (for admin dashboard)
DROP POLICY IF EXISTS "Anyone can update reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can delete reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can update memories" ON memories;
DROP POLICY IF EXISTS "Anyone can delete memories" ON memories;
DROP POLICY IF EXISTS "Anyone can update vibe_videos" ON vibe_videos;
DROP POLICY IF EXISTS "Anyone can delete vibe_videos" ON vibe_videos;
DROP POLICY IF EXISTS "Anyone can insert vibe_videos" ON vibe_videos;
DROP POLICY IF EXISTS "Anyone can insert users" ON users;

CREATE POLICY "Anyone can update reviews" ON reviews
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete reviews" ON reviews
  FOR DELETE USING (true);

CREATE POLICY "Anyone can update memories" ON memories
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete memories" ON memories
  FOR DELETE USING (true);

CREATE POLICY "Anyone can update vibe_videos" ON vibe_videos
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete vibe_videos" ON vibe_videos
  FOR DELETE USING (true);

CREATE POLICY "Anyone can insert vibe_videos" ON vibe_videos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create storage buckets for files
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('memories', 'memories', true),
  ('vibe-videos', 'vibe-videos', true),
  ('avatars', 'avatars', true),
  ('reviews', 'reviews', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (drop if exists first)
DROP POLICY IF EXISTS "Public can view memories" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload memories" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update memories" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete memories" ON storage.objects;
DROP POLICY IF EXISTS "Public can view vibe videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload vibe videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update vibe videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete vibe videos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public can view reviews" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload reviews" ON storage.objects;

-- Memories bucket policies
CREATE POLICY "Public can view memories" ON storage.objects
  FOR SELECT USING (bucket_id = 'memories');

CREATE POLICY "Anyone can upload memories" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'memories');

CREATE POLICY "Anyone can update memories" ON storage.objects
  FOR UPDATE USING (bucket_id = 'memories');

CREATE POLICY "Anyone can delete memories" ON storage.objects
  FOR DELETE USING (bucket_id = 'memories');

-- Vibe videos bucket policies
CREATE POLICY "Public can view vibe videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'vibe-videos');

CREATE POLICY "Anyone can upload vibe videos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vibe-videos');

CREATE POLICY "Anyone can update vibe videos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'vibe-videos');

CREATE POLICY "Anyone can delete vibe videos" ON storage.objects
  FOR DELETE USING (bucket_id = 'vibe-videos');

-- Avatars bucket policies
CREATE POLICY "Public can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

-- Reviews bucket policies
CREATE POLICY "Public can view reviews" ON storage.objects
  FOR SELECT USING (bucket_id = 'reviews');

CREATE POLICY "Anyone can upload reviews" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'reviews');

-- =====================================================
-- SAMPLE DATA (Optional)
-- =====================================================

-- Insert sample user
INSERT INTO users (name, email) VALUES 
  ('DN Tours Team', 'team@dntours.lk');

-- Insert sample vibe video
INSERT INTO vibe_videos (title, video_url, thumbnail_url, duration, order_index) VALUES 
  ('Ella Beauty', '/videos/4.mp4', '/images/ui/5.jpeg', 15, 1);
