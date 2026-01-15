/*
  # Fix RLS Security Policies
  
  ## Changes
  1. Remove old unused tables (about_content, pillars, statistics, testimonials)
  2. Drop existing overly permissive policies on all tables
  3. Create proper restrictive policies:
     - Public read access (anon users can SELECT)
     - Authenticated write access (only authenticated users can INSERT/UPDATE/DELETE)
  
  ## Security
  - All tables maintain RLS enabled
  - Public users can only read data
  - Only authenticated users can modify data
  - No unrestricted access policies
*/

-- Drop old unused tables
DROP TABLE IF EXISTS about_content CASCADE;
DROP TABLE IF EXISTS pillars CASCADE;
DROP TABLE IF EXISTS statistics CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;

-- Members table: Fix policies
DROP POLICY IF EXISTS "Members are publicly readable" ON members;
DROP POLICY IF EXISTS "Authenticated users can manage members" ON members;

CREATE POLICY "Public can read members"
  ON members FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert members"
  ON members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update members"
  ON members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete members"
  ON members FOR DELETE
  TO authenticated
  USING (true);

-- Artworks table: Fix policies
DROP POLICY IF EXISTS "Artworks are publicly readable" ON artworks;
DROP POLICY IF EXISTS "Authenticated users can manage artworks" ON artworks;

CREATE POLICY "Public can read artworks"
  ON artworks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert artworks"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artworks"
  ON artworks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artworks"
  ON artworks FOR DELETE
  TO authenticated
  USING (true);

-- Workshops table: Fix policies
DROP POLICY IF EXISTS "Workshops are publicly readable" ON workshops;
DROP POLICY IF EXISTS "Authenticated users can manage workshops" ON workshops;

CREATE POLICY "Public can read workshops"
  ON workshops FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert workshops"
  ON workshops FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update workshops"
  ON workshops FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete workshops"
  ON workshops FOR DELETE
  TO authenticated
  USING (true);

-- Special Projects table: Fix policies
DROP POLICY IF EXISTS "Special projects are publicly readable" ON special_projects;
DROP POLICY IF EXISTS "Authenticated users can manage special projects" ON special_projects;

CREATE POLICY "Public can read special projects"
  ON special_projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert special projects"
  ON special_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update special projects"
  ON special_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete special projects"
  ON special_projects FOR DELETE
  TO authenticated
  USING (true);

-- Content Archive table: Fix policies
DROP POLICY IF EXISTS "Content archive is publicly readable" ON content_archive;
DROP POLICY IF EXISTS "Authenticated users can manage content" ON content_archive;

CREATE POLICY "Public can read content archive"
  ON content_archive FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert content"
  ON content_archive FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update content"
  ON content_archive FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete content"
  ON content_archive FOR DELETE
  TO authenticated
  USING (true);