/*
  # Create tables for Núcleo Colectivo dynamic content
  
  1. New Tables
    - `about_content`
      - `id` (uuid, primary key)
      - `mission` (text) - Organization mission statement
      - `vision` (text) - Organization vision statement
      - `description` (text) - General description
      - `values` (text[]) - Array of core values
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `pillars`
      - `id` (uuid, primary key)
      - `title` (text) - Pillar title
      - `description` (text) - Pillar description
      - `icon_type` (text) - Icon identifier
      - `order_index` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `testimonials`
      - `id` (uuid, primary key)
      - `author_name` (text) - Name of person giving testimonial
      - `author_role` (text) - Role or description
      - `content` (text) - Testimonial content
      - `rating` (integer) - Rating 1-5
      - `workshop_name` (text) - Related workshop name
      - `is_featured` (boolean) - Featured testimonial flag
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `statistics`
      - `id` (uuid, primary key)
      - `label` (text) - Statistic label
      - `value` (integer) - Numeric value
      - `icon` (text) - Icon identifier
      - `description` (text) - Description text
      - `order_index` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin updates
*/

-- Create about_content table
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission text NOT NULL DEFAULT '',
  vision text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  values text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pillars table
CREATE TABLE IF NOT EXISTS pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_type text NOT NULL DEFAULT 'sparkles',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text NOT NULL DEFAULT '',
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  workshop_name text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  icon text NOT NULL DEFAULT 'Sparkles',
  description text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Policies for about_content (public read)
CREATE POLICY "Anyone can read about content"
  ON about_content FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update about content"
  ON about_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert about content"
  ON about_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for pillars (public read)
CREATE POLICY "Anyone can read pillars"
  ON pillars FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage pillars"
  ON pillars FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for testimonials (public read)
CREATE POLICY "Anyone can read testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for statistics (public read)
CREATE POLICY "Anyone can read statistics"
  ON statistics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage statistics"
  ON statistics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data for about_content
INSERT INTO about_content (mission, vision, description, values)
VALUES (
  'Fomentar la co-creación artística e innovación cultural mediante la integración de inteligencia artificial como herramienta creativa',
  'Ser un espacio referente en Latinoamérica para la transformación del arte y la economía creativa a través de la tecnología',
  'Núcleo Colectivo es un espacio dinámico e interdisciplinario de colaboración donde artistas, emprendedores y la comunidad se reúnen para explorar las fronteras entre el arte, la tecnología y la inteligencia artificial.',
  ARRAY['Innovación', 'Colaboración', 'Creatividad', 'Inclusión', 'Experimentación']
)
ON CONFLICT DO NOTHING;

-- Insert initial pillars data
INSERT INTO pillars (title, description, icon_type, order_index)
VALUES 
  ('Co-creación', 'Fomentamos espacios colaborativos donde artistas, tecnólogos y la comunidad crean juntos', 'users', 1),
  ('Innovación', 'Exploramos las últimas herramientas de IA aplicadas al arte y la creatividad', 'sparkles', 2),
  ('Inclusión', 'Democratizamos el acceso a la tecnología creativa para todos', 'heart', 3),
  ('Comunidad', 'Construimos una red global de creadores y emprendedores culturales', 'globe', 4)
ON CONFLICT DO NOTHING;

-- Insert initial testimonials
INSERT INTO testimonials (author_name, author_role, content, rating, workshop_name, is_featured)
VALUES 
  ('María González', 'Artista Visual', 'Los talleres de IA cambiaron completamente mi proceso creativo. Ahora puedo explorar ideas que antes eran imposibles de visualizar.', 5, 'Taller de IA Generativa', true),
  ('Carlos Mendoza', 'Músico y Productor', 'Increíble cómo la IA puede potenciar la creatividad musical. El equipo de Núcleo Colectivo es excepcional.', 5, 'Taller de Música con IA', true),
  ('Ana Rodríguez', 'Diseñadora Gráfica', 'Una experiencia transformadora. Aprendí herramientas que ahora uso diariamente en mis proyectos profesionales.', 5, 'Taller de IA Generativa', false)
ON CONFLICT DO NOTHING;

-- Insert initial statistics
INSERT INTO statistics (label, value, icon, description, order_index)
VALUES 
  ('Artistas', 500, 'Users', 'Participantes en nuestros talleres', 1),
  ('Proyectos', 150, 'Briefcase', 'Obras creadas en la comunidad', 2),
  ('Horas', 1200, 'Clock', 'De talleres y formación', 3),
  ('Workshops', 50, 'Sparkles', 'Talleres realizados', 4)
ON CONFLICT DO NOTHING;
