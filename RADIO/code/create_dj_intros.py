import asyncio
import json
from external_api import *

# Lista de mini-intros del DJ para NúcleoRadio
dj_intros = [
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

# Intros temáticas por bloques
thematic_intros = [
    {
        "name": "lunes_resonancia",
        "text": "Bienvenides a los Lunes de Resonancia... donde el sonido se estira, se rompe y se vuelve arte. Desde Berlín hasta Palestina, el aire vibra en frecuencias experimentales. ¡Sintonizá, que esto suena a futuro!"
    },
    {
        "name": "martes_territorios",
        "text": "Esto es Martes de Territorios... radios libres, disidentes, del sur del sur. Voces que no caben en los mapas, pero que se oyen fuerte. Escuchá y dejate llevar por las luchas que suenan."
    },
    {
        "name": "miercoles_alternativos",
        "text": "Arrancan los Miércoles Alternativos... beats raros, mezclas imposibles y electrónica sin fronteras. DJ sets para perderse y encontrarse en la pista mental. ¡Ponete los audífonos y subile!"
    },
    {
        "name": "jueves_palabra_viva",
        "text": "En los Jueves Palabra Viva la palabra se mueve, respira, canta y resiste. Voces que cuentan, que recitan, que preguntan. Esto no es solo radio: es memoria, es poesía, es comunidad."
    },
    {
        "name": "viernes_bailables",
        "text": "¡Es viernes y el cuerpo lo sabe! Bienvenides a los Viernes Bailables de NúcleoRadio. Música para soltar, moverse, gozar. House, techno, global beats. ¡Esto se prende ya!"
    },
    {
        "name": "fines_libres",
        "text": "Los fines de semana son libres en NúcleoRadio. Invitades, locuras sonoras, playlists colectivas y mucho más. Acá todo puede pasar... y todo puede sonar. ¡Proponé, creá, compartí!"
    }
]

async def list_available_voices():
    """Lista todas las voces disponibles para encontrar una buena para DJ"""
    print("🎙️ Listando voces disponibles...")
    result = await list_voices(input_params={"voice_type": "system"})
    
    if result.is_error:
        print(f"Error listando voces: {result.message}")
        return None
    else:
        data = json.loads(result.message)
        print(f"Voces disponibles: {json.dumps(data, indent=2, ensure_ascii=False)}")
        return data

async def create_intro_audio(intro, voice_id="male-qn-qingse"):
    """Crear audio para una intro específica"""
    print(f"🎵 Creando audio para: {intro['name']}")
    
    result = await text_to_audio(input_params={
        "text": intro['text'],
        "voice_id": voice_id,
        "speed": 1.1,  # Ligeramente más rápido para energía
        "vol": 1.2,    # Un poco más alto
        "emotion": "happy",  # Energético y positivo
        "language_boost": "Spanish",  # Mejorar pronunciación en español
        "output_directory": "/workspace/nucleo-radio/public/audio/intros/",
        "format": "mp3",
        "sample_rate": 44100,
        "bitrate": 128000
    })
    
    if result.is_error:
        print(f"❌ Error creando audio para {intro['name']}: {result.message}")
        return False
    else:
        data = json.loads(result.message)
        print(f"✅ Audio creado para {intro['name']}: {data}")
        return True

async def main():
    print("🎧 CREANDO MINI-INTROS PARA NÚCLEORADIO 🎧")
    print("=" * 50)
    
    # Crear directorio para audios
    import os
    os.makedirs("/workspace/nucleo-radio/public/audio/intros/", exist_ok=True)
    
    # Listar voces disponibles
    await list_available_voices()
    
    # Crear todas las intros generales
    print("\n🎙️ CREANDO INTROS GENERALES...")
    for intro in dj_intros:
        success = await create_intro_audio(intro, voice_id="male-qn-qingse")
        if success:
            print(f"✅ {intro['name']} - LISTO")
        else:
            print(f"❌ {intro['name']} - ERROR")
        
        await asyncio.sleep(1)  # Pausa entre llamadas
    
    # Crear intros temáticas
    print("\n🎵 CREANDO INTROS TEMÁTICAS...")
    for intro in thematic_intros:
        success = await create_intro_audio(intro, voice_id="male-qn-qingse")
        if success:
            print(f"✅ {intro['name']} - LISTO")
        else:
            print(f"❌ {intro['name']} - ERROR")
        
        await asyncio.sleep(1)  # Pausa entre llamadas
    
    print("\n🎉 ¡TODAS LAS INTROS CREADAS!")
    print("📁 Guardadas en: /workspace/nucleo-radio/public/audio/intros/")

if __name__ == "__main__":
    asyncio.run(main())
