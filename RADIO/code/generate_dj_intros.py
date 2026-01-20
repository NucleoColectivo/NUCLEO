#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de Mini-intros del DJ para NúcleoRadio
Crea audios profesionales para cada bloque temático
"""

import asyncio
import json
import os
from external_api import *

# Crear directorio para audios
audio_dir = "/workspace/nucleo-radio/public/audio"
os.makedirs(audio_dir, exist_ok=True)

# Lista de mini-intros del DJ para NúcleoRadio
intros_dj = [
    {
        "nombre": "intro_general_1",
        "texto": "¡Bienvenides a NúcleoRadio! Desde Medellín para el mundo, esto no es solo una emisora, es un viaje sonoro libre, colectivo y diverso. Subile al volumen y conectá con tu frecuencia interior."
    },
    {
        "nombre": "intro_general_2", 
        "texto": "Estás escuchando NúcleoRadio, donde la cultura suena, la palabra vibra y el arte se mezcla. Radios del sur, beats del mundo. Esto es comunidad en onda expansiva."
    },
    {
        "nombre": "intro_general_3",
        "texto": "Hola, soy tu DJ anfitrión en NúcleoRadio. Hoy te acompaño por un paisaje sonoro de emisoras independientes, territorios vivos y música que mueve el alma. ¡Dale play a la experiencia!"
    },
    {
        "nombre": "intro_general_4",
        "texto": "En NúcleoRadio no hay algoritmos que te digan qué escuchar. Aquí manda el ritmo del corazón, la vibración de la palabra y el poder de lo colectivo. Bienvenide a una emisora diferente."
    },
    {
        "nombre": "intro_general_5",
        "texto": "Esto es NúcleoRadio. Arte, territorio y movimiento sonoro. Una emisora curada con amor desde el sur, para que te conectés con el mundo entero sin moverte de tu lugar. ¡Sintonizá el presente!"
    },
    {
        "nombre": "intro_general_6",
        "texto": "Bienvenide a la frecuencia libre de NúcleoRadio. Estás a punto de entrar en un espacio donde todo puede sonar: poesía, beats, voces rebeldes y paisajes sonoros. Ajustá tus sentidos y disfrutá."
    }
]

# Intros específicas por bloque temático
intros_tematicas = [
    {
        "nombre": "lunes_resonancia",
        "texto": "Bienvenides a los Lunes de Resonancia... donde el sonido se estira, se rompe y se vuelve arte. Desde Berlín hasta Palestina, el aire vibra en frecuencias experimentales. ¡Sintonizá, que esto suena a futuro!"
    },
    {
        "nombre": "martes_territorios", 
        "texto": "Esto es Martes de Territorios... radios libres, disidentes, del sur del sur. Voces que no caben en los mapas, pero que se oyen fuerte. Escuchá y dejate llevar por las luchas que suenan."
    },
    {
        "nombre": "miercoles_alternativos",
        "texto": "Arrancan los Miércoles Alternativos... beats raros, mezclas imposibles y electrónica sin fronteras. DJ sets para perderse y encontrarse en la pista mental. ¡Ponete los audífonos y subile!"
    },
    {
        "nombre": "jueves_palabra_viva",
        "texto": "En los Jueves Palabra Viva la palabra se mueve, respira, canta y resiste. Voces que cuentan, que recitan, que preguntan. Esto no es solo radio: es memoria, es poesía, es comunidad."
    },
    {
        "nombre": "viernes_bailables",
        "texto": "¡Es viernes y el cuerpo lo sabe! Bienvenides a los Viernes Bailables de NúcleoRadio. Música para soltar, moverse, gozar. House, techno, global beats. ¡Esto se prende ya!"
    },
    {
        "nombre": "findesemana_libres",
        "texto": "Los fines de semana son libres en NúcleoRadio. Invitades, locuras sonoras, playlists colectivas y mucho más. Acá todo puede pasar... y todo puede sonar. ¡Proponé, creá, compartí!"
    }
]

async def listar_voces_disponibles():
    """Lista todas las voces disponibles"""
    print("🎤 Explorando voces disponibles...")
    result = await list_voices(input_params={"voice_type": "all"})
    
    if result.is_error:
        print(f"Error al listar voces: {result.message}")
        return None
    
    try:
        data = json.loads(result.message)
        print(f"Respuesta completa: {json.dumps(data, indent=2, ensure_ascii=False)}")
        return data
    except json.JSONDecodeError:
        print(f"Respuesta directa: {result.message}")
        return result.message

async def generar_audio(texto, nombre_archivo, voice_id="Spanish_Narrator"):
    """Genera un archivo de audio a partir de texto"""
    print(f"🎵 Generando audio: {nombre_archivo}")
    
    params = {
        "text": texto,
        "voice_id": voice_id,  # Voz masculina latina
        "output_directory": audio_dir,
        "speed": 1.0,
        "vol": 1.2,  # Un poco más alto
        "pitch": 0,
        "emotion": "happy",
        "sample_rate": 44100,  # Alta calidad
        "bitrate": 128000,
        "format": "mp3",
        "language_boost": "Spanish"  # Español
    }
    
    result = await text_to_audio(input_params=params)
    
    if result.is_error:
        print(f"❌ Error generando {nombre_archivo}: {result.message}")
        return None
    
    try:
        data = json.loads(result.message)
        print(f"✅ Audio generado: {nombre_archivo}")
        print(f"   Resultado: {data}")
        return data
    except json.JSONDecodeError:
        print(f"✅ Audio generado: {nombre_archivo}")
        print(f"   Resultado directo: {result.message}")
        return result.message

async def main():
    """Función principal para generar todos los audios"""
    print("🚀 Iniciando generación de intros de NúcleoRadio")
    print("=" * 60)
    
    # Listar voces disponibles
    voces = await listar_voces_disponibles()
    print("\n" + "=" * 60)
    
    # Generar intros generales
    print("\n🎧 GENERANDO INTROS GENERALES")
    print("-" * 40)
    
    for intro in intros_dj:
        await generar_audio(
            texto=intro["texto"],
            nombre_archivo=f"{intro['nombre']}.mp3"
        )
        await asyncio.sleep(1)  # Pausa entre llamadas
    
    # Generar intros temáticas
    print("\n📅 GENERANDO INTROS TEMÁTICAS")
    print("-" * 40)
    
    for intro in intros_tematicas:
        await generar_audio(
            texto=intro["texto"],
            nombre_archivo=f"{intro['nombre']}.mp3"
        )
        await asyncio.sleep(1)  # Pausa entre llamadas
    
    print("\n🎉 ¡PROCESO COMPLETADO!")
    print(f"📁 Archivos guardados en: {audio_dir}")
    
    # Listar archivos generados
    print("\n📋 ARCHIVOS GENERADOS:")
    try:
        archivos = os.listdir(audio_dir)
        for archivo in sorted(archivos):
            if archivo.endswith('.mp3'):
                print(f"   🎵 {archivo}")
    except Exception as e:
        print(f"Error listando archivos: {e}")

if __name__ == "__main__":
    asyncio.run(main())