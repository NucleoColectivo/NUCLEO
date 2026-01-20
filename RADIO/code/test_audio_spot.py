#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Demo de reproducción de spots de NúcleoRadio
"""

import asyncio
import json
from external_api import *

async def reproducir_intro_principal():
    """Reproduce la intro principal de NúcleoRadio como demo"""
    print("🎧 Reproduciendo intro principal de NúcleoRadio...")
    print("   (Esta sería la experiencia que tendrían los usuarios)")
    
    audio_file = "/workspace/nucleo-radio/public/audio/t2a_¡Bienvenid_20250608_072611.mp3"
    
    result = await play_audio(input_params={
        "input_file_path": audio_file,
        "is_url": False
    })
    
    if result.is_error:
        print(f"❌ Error: {result.message}")
    else:
        print(f"✅ Reproduciendo: {result.message}")

if __name__ == "__main__":
    asyncio.run(reproducir_intro_principal())
