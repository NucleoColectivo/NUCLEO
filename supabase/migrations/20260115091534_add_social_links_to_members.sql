/*
  # Agregar Enlaces Sociales a Artistas

  ## Cambios
  
  1. Nuevas Columnas en `members`
    - `instagram_url` (text) - URL del perfil de Instagram del artista
    - `youtube_url` (text) - URL del canal de YouTube del artista
    - `website_url` (text) - URL del sitio web personal del artista
  
  2. Datos Iniciales
    - Agregar enlaces para Manuel Palacio según especificación
  
  ## Notas
  - Las columnas son opcionales (nullable) ya que no todos los artistas tendrán todos los enlaces
  - Los enlaces se validan en el frontend antes de insertar
*/

-- Agregar columnas de enlaces sociales
ALTER TABLE members 
  ADD COLUMN IF NOT EXISTS instagram_url text,
  ADD COLUMN IF NOT EXISTS youtube_url text,
  ADD COLUMN IF NOT EXISTS website_url text;

-- Actualizar datos de Manuel Palacio con enlaces reales
UPDATE members
SET 
  instagram_url = 'https://www.instagram.com/manuelpalacio/',
  youtube_url = 'https://www.youtube.com/@ManuelPalacioA',
  website_url = 'https://nucleocolectivo.github.io/PORTAFOLIO/'
WHERE slug = 'manuel-palacio';

-- Nota: Los demás artistas pueden tener sus enlaces agregados posteriormente
-- a través del panel de administración o actualizaciones manuales