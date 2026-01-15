/*
  # Núcleo Colectivo - Complete Database Schema
  
  ## Overview
  Complete database structure for Núcleo Colectivo platform, supporting:
  - Member portfolios (Manuel, Carlos, future members)
  - Artistic works showcase
  - Educational workshops
  - Special projects (Cosiaca 350, etc)
  - Content archive (texts, videos, podcasts)
  - Contact and alliances
  
  ## Tables
  
  ### 1. Members
  - `id` (uuid, primary key)
  - `name` (text) - Full name
  - `slug` (text, unique) - URL-friendly identifier
  - `role` (text) - Artist, designer, researcher, etc.
  - `bio` (text) - Biography/description
  - `profile_image` (text) - URL to profile image
  - `disciplines` (jsonb) - Array of disciplines
  - `featured` (boolean) - Show on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. Artworks
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `member_id` (uuid) - Link to member
  - `category` (text) - Installation, illustration, multimedia, etc.
  - `year` (integer)
  - `images` (jsonb) - Array of image URLs
  - `video_url` (text) - Optional video
  - `context` (text) - Extended context
  - `activation_formats` (jsonb) - How it can be activated
  - `available_for_sale` (boolean)
  - `featured` (boolean)
  - `order_index` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 3. Workshops
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `description` (text)
  - `focus` (text) - Main focus (IA, creative processes, etc.)
  - `duration` (text)
  - `format` (text) - Online, presential, hybrid
  - `audience` (text)
  - `price` (integer)
  - `image` (text)
  - `featured` (boolean)
  - `active` (boolean)
  - `order_index` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 4. Special Projects
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `tagline` (text)
  - `description` (text)
  - `category` (text) - Editorial, narrative universe, etc.
  - `image` (text)
  - `url` (text) - External URL if applicable
  - `featured` (boolean)
  - `active` (boolean)
  - `order_index` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 5. Content Archive
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `type` (text) - text, video, podcast, process
  - `content` (text) - Main content or description
  - `url` (text) - External URL if applicable
  - `thumbnail` (text)
  - `author_id` (uuid) - Link to member
  - `published_date` (date)
  - `featured` (boolean)
  - `tags` (jsonb) - Array of tags
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  All tables have RLS enabled with public read access and authenticated write access
*/

-- Members Table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  role text NOT NULL,
  bio text,
  profile_image text,
  disciplines jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members are publicly readable"
  ON members FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage members"
  ON members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Artworks Table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  member_id uuid REFERENCES members(id) ON DELETE SET NULL,
  category text,
  year integer,
  images jsonb DEFAULT '[]'::jsonb,
  video_url text,
  context text,
  activation_formats jsonb DEFAULT '[]'::jsonb,
  available_for_sale boolean DEFAULT false,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artworks are publicly readable"
  ON artworks FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage artworks"
  ON artworks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Workshops Table
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  focus text,
  duration text,
  format text,
  audience text,
  price integer DEFAULT 0,
  image text,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workshops are publicly readable"
  ON workshops FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage workshops"
  ON workshops FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Special Projects Table
CREATE TABLE IF NOT EXISTS special_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text,
  description text,
  category text,
  image text,
  url text,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE special_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Special projects are publicly readable"
  ON special_projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage special projects"
  ON special_projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Content Archive Table
CREATE TABLE IF NOT EXISTS content_archive (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL,
  content text,
  url text,
  thumbnail text,
  author_id uuid REFERENCES members(id) ON DELETE SET NULL,
  published_date date DEFAULT CURRENT_DATE,
  featured boolean DEFAULT false,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_archive ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content archive is publicly readable"
  ON content_archive FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage content"
  ON content_archive FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_members_slug ON members(slug);
CREATE INDEX IF NOT EXISTS idx_members_featured ON members(featured);
CREATE INDEX IF NOT EXISTS idx_artworks_slug ON artworks(slug);
CREATE INDEX IF NOT EXISTS idx_artworks_member_id ON artworks(member_id);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON artworks(featured);
CREATE INDEX IF NOT EXISTS idx_workshops_slug ON workshops(slug);
CREATE INDEX IF NOT EXISTS idx_workshops_active ON workshops(active);
CREATE INDEX IF NOT EXISTS idx_special_projects_slug ON special_projects(slug);
CREATE INDEX IF NOT EXISTS idx_content_archive_slug ON content_archive(slug);
CREATE INDEX IF NOT EXISTS idx_content_archive_type ON content_archive(type);
CREATE INDEX IF NOT EXISTS idx_content_archive_author_id ON content_archive(author_id);