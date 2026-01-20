#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador individual de intro del DJ para NúcleoRadio
"""

import asyncio
import json
import os
from external_api import *

# Crear directorio para audios
audio_dir = "/workspace/nucleo-radio/public/audio"
os.makedirs(audio_dir, exist_ok=True)

async def generar_intro_principal():
    """Genera la intro principal de NúcleoRadio"""
    texto = "¡Bienvenides a NúcleoRadio! Desde Medellín para el mundo, esto no es solo una emisora, es un viaje sonoro libre, colectivo y diverso. Subile al volumen y conectá con tu frecuencia interior."
    
    print(f"🎵 Generando intro principal de NúcleoRadio...")
    
    params = {
        "text": texto,
        "voice_id": "Spanish_Narrator",  # Voz de narrador en español
        "output_directory": audio_dir,
        "speed": 1.0,
        "vol": 1.3,  # Un poco más alto para radio
        "pitch": 0,
        "emotion": "happy",
        "sample_rate": 44100,  # Alta calidad
        "bitrate": 128000,
        "format": "mp3",
        "language_boost": "Spanish"
    }
    
    result = await text_to_audio(input_params=params)
    
    if result.is_error:
        print(f"❌ Error: {result.message}")
        return None
    
    try:
        data = json.loads(result.message)
        print(f"✅ Intro principal generada exitosamente!")
        print(f"   Detalles: {data}")
        return data
    except json.JSONDecodeError:
        print(f"✅ Intro principal generada!")
        print(f"   Resultado: {result.message}")
        return result.message

if __name__ == "__main__":
    asyncio.run(generar_intro_principal())
