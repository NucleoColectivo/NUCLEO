#!/bin/bash

echo "🚀 Iniciando deployment..."

# Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf nucleo-colectivo/dist

# Entrar al directorio
cd nucleo-colectivo

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Build
echo "🔨 Compilando..."
npm run build

# Verificar
if [ -d "dist" ]; then
  echo "✅ Build exitoso"
  echo "📁 Archivos generados:"
  ls -lh dist/
  exit 0
else
  echo "❌ Error: No se generó el directorio dist"
  exit 1
fi
