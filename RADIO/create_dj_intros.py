#!/usr/bin/env python3
import asyncio
import json
from external_api import *

# 🎙️ Mini-intros del DJ para NúcleoRadio
INTRO_TEXTS = [
    {
        "name": "intro_general_1",
        "text": "¡Bienvenides a NúcleoRadio! Desde Medellín para el mundo, esto no es solo una emisora, es un viaje sonoro libre, colectivo y diverso. Subile al volumen y conectá con tu frecuencia interior."
    },
    {
        "name": "intro_general_2", 
        "text": "Estás escuchando NúcleoRadio, donde la cultura suena, la palabra vibra y el arte se mezcla. Radios del sur, beats del mundo. Esto es comunidad en onda expansiva."
    },
    {
        "name": "intro_general_3",
        "text": "Hola, soy tu DJ anfitrión en NúcleoRadio. Hoy te acompaño por un paisaje sonoro de emisoras independientes, territorios vivos y música que mueve el alma. ¡Dale play a la experiencia!"
    },
    {
        "name": "intro_general_4",
        "text": "En NúcleoRadio no hay algoritmos que te digan qué escuchar. Aquí manda el ritmo del corazón, la vibración de la palabra y el poder de lo colectivo. Bienvenide a una emisora diferente."
    },
    {
        "name": "intro_general_5",
        "text": "Esto es NúcleoRadio. Arte, territorio y movimiento sonoro. Una emisora curada con amor desde el sur, para que te conectés con el mundo entero sin moverte de tu lugar. ¡Sintonizá el presente!"
    },
    {
        "name": "intro_general_6",
        "text": "Bienvenide a la frecuencia libre de NúcleoRadio. Estás a punto de entrar en un espacio donde todo puede sonar: poesía, beats, voces rebeldes y paisajes sonoros. Ajustá tus sentidos y disfrutá."
    }
]

async def list_available_voices():
    """Lista todas las voces disponibles para encontrar una buena para DJ"""
    print("🎙️ Listando voces disponibles...")
    
    result = await list_voices(input_params={"voice_type": "all"})
    if result.is_error:
        print(f"❌ Error: {result.message}")
        return None
    else:
        data = json.loads(result.message)
        print("✅ Voces disponibles:")
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return data

async def create_dj_intro(text_data, voice_id="male-qn-qingse"):
    """Crea un intro de DJ con los parámetros optimizados"""
    print(f"🎵 Creando intro: {text_data['name']}")
    
    result = await text_to_audio(input_params={
        "text": text_data["text"],
        "voice_id": voice_id,  # Voz masculina cálida
        "model": "speech-02-hd",  # Modelo HD para mejor calidad
        "speed": 1.1,  # Ligeramente más rápido para energía
        "vol": 1.2,  # Un poco más alto para radio
        "pitch": 0,  # Pitch normal
        "emotion": "happy",  # Emoción positiva para DJ
        "sample_rate": 44100,  # Calidad de audio profesional
        "bitrate": 256000,  # Bitrate alto para calidad
        "channel": 1,  # Mono para radio
        "format": "mp3",  # MP3 para compatibilidad
        "language_boost": "Spanish",  # Boost de español
        "output_directory": "/workspace/audio"
    })
    
    if result.is_error:
        print(f"❌ Error creando {text_data['name']}: {result.message}")
        return None
    else:
        data = json.loads(result.message)
        print(f"✅ Creado: {text_data['name']}")
        return data

async def main():
    """Función principal para crear todos los intros"""
    print("🚀 CREANDO MINI-INTROS DE DJ PARA NÚCLEORADIO")
    print("=" * 50)
    
    # Crear directorio de audio
    import os
    os.makedirs("/workspace/audio", exist_ok=True)
    
    # Listar voces disponibles primero
    await list_available_voices()
    
    print("\n🎙️ CREANDO INTROS...")
    print("-" * 30)
    
    # Crear todos los intros
    for intro_text in INTRO_TEXTS:
        try:
            result = await create_dj_intro(intro_text, voice_id="male-qn-qingse")
            if result:
                print(f"📁 Archivo guardado para: {intro_text['name']}")
            await asyncio.sleep(2)  # Pausa entre requests
        except Exception as e:
            print(f"❌ Error con {intro_text['name']}: {str(e)}")
    
    print("\n✅ PROCESO COMPLETADO!")
    print("🎵 Todos los mini-intros del DJ han sido generados")

if __name__ == "__main__":
    asyncio.run(main())
