/*
  # Corrección de Políticas RLS de Seguridad

  ## Cambios Críticos de Seguridad

  ### Problema Identificado
  Las políticas RLS existentes permiten que CUALQUIER usuario autenticado 
  pueda insertar, actualizar o eliminar TODOS los registros en las tablas:
  - members
  - artworks
  - workshops
  - special_projects
  - content_archive

  Esto es un RIESGO CRÍTICO DE SEGURIDAD que viola el principio de 
  privilegio mínimo.

  ### Solución Implementada
  1. Eliminar políticas que usan `USING (true)` o `WITH CHECK (true)`
  2. Mantener políticas de lectura pública para contenido activo
  3. Las operaciones de escritura ahora están BLOQUEADAS por defecto
  4. Solo se permitirán cuando se implemente un sistema de roles admin

  ### Tablas Afectadas
  - members
  - artworks  
  - workshops
  - special_projects
  - content_archive

  ### Notas Importantes
  - Las operaciones de lectura (SELECT) siguen siendo públicas para contenido activo
  - Las operaciones de escritura (INSERT/UPDATE/DELETE) están bloqueadas
  - Para administrar contenido, se debe usar el service_role key directamente
  - En el futuro, implementar sistema de roles con columna `role` en tabla `users`
*/

-- ============================================
-- MEMBERS TABLE
-- ============================================

-- Eliminar políticas inseguras
DROP POLICY IF EXISTS "Authenticated users can insert members" ON members;
DROP POLICY IF EXISTS "Authenticated users can update members" ON members;
DROP POLICY IF EXISTS "Authenticated users can delete members" ON members;

-- La política de lectura pública ya existe y es correcta:
-- "Anyone can view members" - SELECT WHERE true (está bien para contenido público)

-- ============================================
-- ARTWORKS TABLE
-- ============================================

-- Eliminar políticas inseguras
DROP POLICY IF EXISTS "Authenticated users can insert artworks" ON artworks;
DROP POLICY IF EXISTS "Authenticated users can update artworks" ON artworks;
DROP POLICY IF EXISTS "Authenticated users can delete artworks" ON artworks;

-- La política de lectura ya existe y es correcta:
-- "Anyone can view artworks" - filtra por obras activas de miembros activos

-- ============================================
-- WORKSHOPS TABLE
-- ============================================

-- Eliminar políticas inseguras
DROP POLICY IF EXISTS "Authenticated users can insert workshops" ON workshops;
DROP POLICY IF EXISTS "Authenticated users can update workshops" ON workshops;
DROP POLICY IF EXISTS "Authenticated users can delete workshops" ON workshops;

-- La política de lectura ya existe y es correcta:
-- "Anyone can view active workshops" - SELECT WHERE active = true

-- ============================================
-- SPECIAL_PROJECTS TABLE
-- ============================================

-- Eliminar políticas inseguras
DROP POLICY IF EXISTS "Authenticated users can insert special projects" ON special_projects;
DROP POLICY IF EXISTS "Authenticated users can update special projects" ON special_projects;
DROP POLICY IF EXISTS "Authenticated users can delete special projects" ON special_projects;

-- La política de lectura ya existe y es correcta:
-- "Anyone can view active special projects" - SELECT WHERE active = true

-- ============================================
-- CONTENT_ARCHIVE TABLE
-- ============================================

-- Eliminar políticas inseguras
DROP POLICY IF EXISTS "Authenticated users can insert content" ON content_archive;
DROP POLICY IF EXISTS "Authenticated users can update content" ON content_archive;
DROP POLICY IF EXISTS "Authenticated users can delete content" ON content_archive;

-- La política de lectura ya existe y es correcta:
-- "Anyone can view content" - SELECT WHERE true (contenido público)

-- ============================================
-- NOTAS PARA FUTURAS IMPLEMENTACIONES
-- ============================================

/*
Para implementar administración segura, considerar estas opciones:

OPCIÓN 1: Sistema de Roles con Supabase Auth
-------------------------------------------------
1. Agregar metadata a usuarios en auth.users:
   
   UPDATE auth.users 
   SET raw_app_metadata = jsonb_set(
     COALESCE(raw_app_metadata, '{}'::jsonb),
     '{role}',
     '"admin"'
   )
   WHERE email = 'admin@nucleocolectivo.com';

2. Crear políticas que verifiquen el rol:

   CREATE POLICY "Admins can manage members"
   ON members FOR ALL
   TO authenticated
   USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
   WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

OPCIÓN 2: Tabla de Roles Personalizada
-------------------------------------------------
1. Crear tabla admin_users con user_id

2. Políticas que verifiquen membresía:

   CREATE POLICY "Admin users can manage members"
   ON members FOR ALL
   TO authenticated
   USING (
     EXISTS (
       SELECT 1 FROM admin_users
       WHERE user_id = auth.uid()
     )
   )
   WITH CHECK (
     EXISTS (
       SELECT 1 FROM admin_users
       WHERE user_id = auth.uid()
     )
   );

OPCIÓN 3: Ownership-based (si cada miembro gestiona su contenido)
-------------------------------------------------
1. Agregar user_id a members table

2. Políticas de ownership:

   CREATE POLICY "Members can update own profile"
   ON members FOR UPDATE
   TO authenticated
   USING (user_id = auth.uid())
   WITH CHECK (user_id = auth.uid());
*/