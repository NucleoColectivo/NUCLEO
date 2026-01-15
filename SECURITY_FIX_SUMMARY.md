# Corrección de Seguridad RLS - Núcleo Colectivo

## 🔴 Problema Crítico Identificado

Las políticas de Row Level Security (RLS) en Supabase permitían que **cualquier usuario autenticado** pudiera:
- Insertar nuevos registros en todas las tablas
- Modificar cualquier registro existente
- Eliminar cualquier contenido

Esto representaba un **riesgo crítico de seguridad** que violaba el principio de privilegio mínimo.

## ✅ Solución Implementada

### Cambios Realizados

1. **Eliminadas políticas inseguras** en las siguientes tablas:
   - `members` (artistas)
   - `artworks` (obras)
   - `workshops` (talleres)
   - `special_projects` (proyectos especiales)
   - `content_archive` (archivo de contenidos)

2. **Mantenidas políticas de lectura pública**:
   - Los visitantes pueden ver todo el contenido activo
   - La vitrina de artistas funciona correctamente
   - El sitio web sigue siendo público

3. **Bloqueadas operaciones de escritura**:
   - INSERT, UPDATE, DELETE ahora están bloqueadas por defecto
   - Solo accesibles usando `service_role_key` (admin)

## 📊 Estado Actual de Seguridad

### ✅ Acceso Público (usando `anon_key`)
- ✅ **SELECT** en contenido activo: PERMITIDO
- ❌ **INSERT**: BLOQUEADO
- ❌ **UPDATE**: BLOQUEADO
- ❌ **DELETE**: BLOQUEADO

### ✅ Acceso Administrativo (usando `service_role_key`)
- ✅ **SELECT**: PERMITIDO
- ✅ **INSERT**: PERMITIDO
- ✅ **UPDATE**: PERMITIDO
- ✅ **DELETE**: PERMITIDO

## 🔧 Cómo Gestionar Contenido Ahora

### Opción 1: Usar el Dashboard de Supabase
1. Ir a https://supabase.com/dashboard
2. Seleccionar el proyecto
3. Ir a "Table Editor"
4. Editar datos directamente en la interfaz

### Opción 2: Usar SQL con Service Role Key
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ NUNCA exponer en frontend
)

// Ahora puedes insertar/actualizar/eliminar
await supabaseAdmin.from('members').insert({...})
```

### ⚠️ IMPORTANTE: Service Role Key
- **NUNCA** uses el `service_role_key` en el frontend
- Solo úsalo en:
  - Backend/API endpoints
  - Scripts administrativos
  - Funciones de Edge/Serverless

## 🚀 Próximos Pasos: Sistema de Administración

Para crear un panel de administración seguro, implementa uno de estos enfoques:

### Enfoque 1: Roles en Auth Metadata (Recomendado)

```sql
-- 1. Asignar rol de admin a un usuario
UPDATE auth.users
SET raw_app_metadata = jsonb_set(
  COALESCE(raw_app_metadata, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@nucleocolectivo.com';

-- 2. Crear políticas basadas en rol
CREATE POLICY "Admins can manage members"
ON members FOR ALL
TO authenticated
USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
```

### Enfoque 2: Tabla de Admins

```sql
-- 1. Crear tabla de administradores
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Políticas basadas en membresía
CREATE POLICY "Admins can manage members"
ON members FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE user_id = auth.uid()
  )
);
```

### Enfoque 3: Ownership (cada artista gestiona su contenido)

```sql
-- 1. Agregar user_id a members
ALTER TABLE members ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- 2. Políticas de propiedad
CREATE POLICY "Artists can update own profile"
ON members FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

## 📝 Datos de Prueba Actuales

### Artistas en la Base de Datos
1. **Manuel Palacio**
   - 6 obras (videoarte, ilustración, proyectos interactivos)
   - Slug: `manuel-palacio`

2. **Carlos Londoño**
   - 6 obras (fotografía, performance, ensayos visuales)
   - Slug: `carlos-londono`

## 🔍 Verificación

### Prueba que la Lectura Funciona
```javascript
const { data } = await supabase
  .from('members')
  .select('*, artworks(*)')

console.log(data) // ✅ Debe funcionar
```

### Prueba que la Escritura Está Bloqueada
```javascript
const { error } = await supabase
  .from('members')
  .insert({ name: 'Test' })

console.log(error) // ✅ Debe mostrar error de política RLS
```

## 📚 Referencias

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Security Best Practices](https://supabase.com/docs/guides/auth/managing-user-data)
- [Service Role vs Anon Key](https://supabase.com/docs/guides/api/api-keys)

---

**Resumen**: La seguridad ahora está correctamente configurada. El sitio público funciona, pero las operaciones administrativas requieren autenticación y autorización adecuadas.
