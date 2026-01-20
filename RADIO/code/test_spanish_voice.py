import asyncio
import json
from external_api import *

async def test_spanish_voice():
    """Probar una voz en español para el DJ"""
    print("🎙️ Probando voz en español...")
    
    # Crear directorio para test
    import os
    os.makedirs("/workspace/nucleo-radio/public/audio/test/", exist_ok=True)
    
    test_text = "¡Bienvenides a NúcleoRadio! Desde Medellín para el mundo."
    
    # Probar voz masculina española
    result = await text_to_audio(input_params={
        "text": test_text,
        "voice_id": "Spanish_Narrator",  # Narrador en español
        "speed": 1.0,
        "vol": 1.2,
        "emotion": "happy",
        "language_boost": "Spanish",
        "output_directory": "/workspace/nucleo-radio/public/audio/test/",
        "format": "mp3",
        "sample_rate": 44100,
        "bitrate": 128000
    })
    
    if result.is_error:
        print(f"❌ Error: {result.message}")
    else:
        data = json.loads(result.message)
        print(f"✅ Audio de prueba creado: {data}")

if __name__ == "__main__":
    asyncio.run(test_spanish_voice())
