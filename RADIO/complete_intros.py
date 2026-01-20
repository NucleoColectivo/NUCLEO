#!/usr/bin/env python3
import asyncio
import json
from external_api import *

# 🎙️ Remaining intros for NúcleoRadio
REMAINING_INTROS = [
    {
        "name": "intro_general_5",
        "text": "Esto es NúcleoRadio. Arte, territorio y movimiento sonoro. Una emisora curada con amor desde el sur, para que te conectés con el mundo entero sin moverte de tu lugar. ¡Sintonizá el presente!"
    },
    {
        "name": "intro_general_6", 
        "text": "Bienvenide a la frecuencia libre de NúcleoRadio. Estás a punto de entrar en un espacio donde todo puede sonar: poesía, beats, voces rebeldes y paisajes sonoros. Ajustá tus sentidos y disfrutá."
    }
]

async def create_remaining_intros():
    """Crear los intros restantes"""
    print("🎵 COMPLETANDO MINI-INTROS DEL DJ")
    print("=" * 40)
    
    for intro_text in REMAINING_INTROS:
        try:
            print(f"🎙️ Creando: {intro_text['name']}")
            
            result = await text_to_audio(input_params={
                "text": intro_text["text"],
                "voice_id": "presenter_male",  # Voz de presentador masculino
                "model": "speech-02-hd",
                "speed": 1.1,
                "vol": 1.3,
                "pitch": 0,
                "emotion": "happy",
                "sample_rate": 44100,
                "bitrate": 256000,
                "channel": 1,
                "format": "mp3",
                "language_boost": "Spanish",
                "output_directory": "/workspace/audio"
            })
            
            if result.is_error:
                print(f"❌ Error: {result.message}")
            else:
                data = json.loads(result.message)
                print(f"✅ Creado: {intro_text['name']}")
                
            await asyncio.sleep(3)  # Pausa entre requests
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
    
    print("\n🎵 INTROS COMPLETADOS!")

if __name__ == "__main__":
    asyncio.run(create_remaining_intros())
