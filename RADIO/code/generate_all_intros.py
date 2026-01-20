#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador completo de todas las mini-intros del DJ para NúcleoRadio
"""

import asyncio
import json
import os
from external_api import *

# Crear directorio para audios
audio_dir = "/workspace/nucleo-radio/public/audio"
os.makedirs(audio_dir, exist_ok=True)

# Todas las intros de NúcleoRadio
todas_las_intros = [
    # Intros generales
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
    },
    
    # Intros temáticas por día
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

async def generar_audio_intro(intro_data):
    """Genera un archivo de audio para una intro específica"""
    nombre = intro_data["nombre"]
    texto = intro_data["texto"]
    
    print(f"🎵 Generando: {nombre}")
    
    params = {
        "text": texto,
        "voice_id": "Spanish_Narrator",  # Voz de narrador profesional en español
        "output_directory": audio_dir,
        "speed": 1.1,  # Ligeramente más rápido para radio
        "vol": 1.4,  # Volumen alto para radio
        "pitch": 0,
        "emotion": "happy",
        "sample_rate": 44100,
        "bitrate": 128000,
        "format": "mp3",
        "language_boost": "Spanish"
    }
    
    try:
        result = await text_to_audio(input_params=params)
        
        if result.is_error:
            print(f"❌ Error en {nombre}: {result.message}")
            return False
        
        data = json.loads(result.message)
        archivo_generado = data['content'][0]['text']
        print(f"✅ {nombre} → {archivo_generado}")
        return True
        
    except Exception as e:
        print(f"❌ Excepción en {nombre}: {e}")
        return False

async def main():
    """Función principal para generar todas las intros"""
    print("🎧 GENERANDO TODAS LAS MINI-INTROS DE NÚCLEORADIO")
    print("=" * 60)
    
    exitosos = 0
    total = len(todas_las_intros)
    
    for i, intro in enumerate(todas_las_intros, 1):
        print(f"\n[{i}/{total}] ", end="")
        
        if await generar_audio_intro(intro):
            exitosos += 1
        
        # Pausa entre generaciones para evitar límites de API
        if i < total:
            await asyncio.sleep(2)
    
    print(f"\n" + "=" * 60)
    print(f"🎉 PROCESO COMPLETADO!")
    print(f"✅ Generados exitosamente: {exitosos}/{total}")
    print(f"📁 Archivos guardados en: {audio_dir}")
    
    # Listar todos los archivos de audio generados
    print(f"\n📋 ARCHIVOS DE AUDIO DISPONIBLES:")
    try:
        archivos = [f for f in os.listdir(audio_dir) if f.endswith('.mp3')]
        for archivo in sorted(archivos):
            print(f"   🎵 {archivo}")
        print(f"\nTotal de archivos: {len(archivos)}")
    except Exception as e:
        print(f"Error listando archivos: {e}")

if __name__ == "__main__":
    asyncio.run(main())
