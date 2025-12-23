#!/usr/bin/env python3
"""
Script para verificar emisoras adicionales de alta calidad encontradas
Autor: Researcher Agent
Fecha: 2025-06-08
"""

import requests
import urllib.request
import json
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse
import re
import warnings
warnings.filterwarnings('ignore')

class AdditionalRadioTester:
    def __init__(self):
        self.results = []
        self.timeout = 15
        
    def get_headers(self):
        """Headers para simular un navegador real"""
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'identity',
            'Connection': 'keep-alive',
        }
    
    def test_stream_connectivity(self, url, station_name):
        """Prueba la conectividad básica del stream"""
        try:
            print(f"🔍 Probando: {station_name}")
            
            req = urllib.request.Request(url, headers=self.get_headers())
            
            with urllib.request.urlopen(req, timeout=self.timeout) as response:
                headers = dict(response.headers)
                status_code = response.getcode()
                sample_data = response.read(1024)
                
                stream_info = self.analyze_stream_headers(headers)
                
                result = {
                    'station_name': station_name,
                    'url': url,
                    'status': 'CONECTADO',
                    'status_code': status_code,
                    'content_type': headers.get('content-type', 'No especificado'),
                    'server': headers.get('server', 'No especificado'),
                    'bitrate': stream_info.get('bitrate', 'No detectado'),
                    'format': stream_info.get('format', 'No detectado'),
                    'icy_name': headers.get('icy-name', 'No especificado'),
                    'icy_genre': headers.get('icy-genre', 'No especificado'),
                    'icy_br': headers.get('icy-br', 'No especificado'),
                    'sample_size': len(sample_data),
                    'reliability_score': self.calculate_reliability_score(headers, status_code, len(sample_data))
                }
                
                print(f"✅ {station_name}: CONECTADO - {stream_info.get('bitrate', 'Unknown')} - {stream_info.get('format', 'Unknown')}")
                return result
                
        except Exception as e:
            result = {
                'station_name': station_name,
                'url': url,
                'status': 'ERROR',
                'error_message': str(e),
                'reliability_score': 0
            }
            print(f"❌ {station_name}: ERROR - {str(e)}")
            return result
    
    def analyze_stream_headers(self, headers):
        """Analiza los headers para extraer información del stream"""
        info = {
            'bitrate': 'No detectado',
            'format': 'No detectado'
        }
        
        if 'icy-br' in headers:
            info['bitrate'] = f"{headers['icy-br']}kbps"
        
        content_type = headers.get('content-type', '').lower()
        if 'mp3' in content_type or 'mpeg' in content_type:
            info['format'] = 'MP3'
        elif 'aac' in content_type:
            info['format'] = 'AAC'
        elif 'ogg' in content_type:
            info['format'] = 'OGG'
        elif 'flac' in content_type:
            info['format'] = 'FLAC'
        elif 'audio' in content_type:
            info['format'] = 'Audio Stream'
            
        return info
    
    def calculate_reliability_score(self, headers, status_code, sample_size):
        """Calcula un score de confiabilidad del 1-10"""
        score = 0
        
        if status_code == 200:
            score += 3
        if sample_size > 0:
            score += 2
        if headers.get('icy-name'):
            score += 1
        if headers.get('icy-br'):
            score += 1
        if headers.get('icy-genre'):
            score += 1
        
        content_type = headers.get('content-type', '').lower()
        if any(audio_type in content_type for audio_type in ['audio', 'mp3', 'aac', 'ogg', 'flac']):
            score += 2
        
        return min(score, 10)
    
    def test_stations_batch(self, stations):
        """Prueba múltiples estaciones en paralelo"""
        print(f"🚀 Iniciando prueba de {len(stations)} emisoras adicionales...")
        
        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = []
            for station in stations:
                future = executor.submit(
                    self.test_stream_connectivity, 
                    station['url'], 
                    station['name']
                )
                futures.append(future)
            
            for future in as_completed(futures):
                try:
                    result = future.result(timeout=self.timeout + 5)
                    self.results.append(result)
                except Exception as e:
                    print(f"❌ Error en prueba paralela: {e}")
        
        return self.results

def main():
    """Función principal"""
    # Emisoras adicionales de alta calidad para probar
    emisoras_adicionales = [
        # De audiokarma.org
        {
            "name": "Europa Jazz",
            "url": "http://onair.europaradiojazz.org/radio/8000/hd",
            "genre": "Jazz",
            "source": "AudioKarma"
        },
        {
            "name": "Hi Online Jazz", 
            "url": "http://mediaserv38.live-streams.nl:8006/stream",
            "genre": "Jazz",
            "source": "AudioKarma"
        },
        {
            "name": "Cro D-dur",
            "url": "http://amp.cesnet.cz:8000/cro-d-dur-256.ogg",
            "genre": "Classical",
            "source": "AudioKarma"
        },
        {
            "name": "Rondo Klassu Pro",
            "url": "http://rondo.iradio.fi:8000/klasupro.flac",
            "genre": "Classical",
            "source": "AudioKarma"
        },
        {
            "name": "MotherEarth Klassik",
            "url": "http://server9.streamserver24.com:18910/motherearth.klassik",
            "genre": "Classical",
            "source": "AudioKarma"
        },
        {
            "name": "Sector Classical",
            "url": "http://89.223.45.5:8000/nota-flac",
            "genre": "Classical",
            "source": "AudioKarma"
        },
        {
            "name": "WQXR",
            "url": "http://njpr.wnyc.org/wqxr.aac",
            "genre": "Classical",
            "source": "AudioKarma"
        },
        {
            "name": "SuperStereo 7",
            "url": "http://198.204.228.202:8030/flac7",
            "genre": "Jazz",
            "source": "AudioKarma"
        },
        {
            "name": "SomaFM Groove Salad FLAC",
            "url": "https://hls.somafm.com/hls/groovesalad/FLAC/program.m3u8",
            "genre": "Ambient",
            "source": "AudioKarma"
        },
        {
            "name": "SuperStereo 5",
            "url": "http://198.204.228.202:8643/flac5",
            "genre": "Rock",
            "source": "AudioKarma"
        },
        # Hi On Line Radio
        {
            "name": "Hi On Line Radio",
            "url": "https://mediaserv30.live-streams.nl:2199/tunein/-stream/hionline.pls",
            "genre": "Eclectic",
            "source": "HiOnline"
        },
        # De las recomendaciones de Audiogon
        {
            "name": "Radio Paradise - AAC 320",
            "url": "http://stream.radioparadise.com/aac-320",
            "genre": "Eclectic",
            "source": "Audiogon"
        },
        # Emisoras adicionales de alta calidad conocidas
        {
            "name": "Linn Radio",
            "url": "http://216.235.252.8:8020/high.mp3",
            "genre": "Eclectic",
            "source": "Additional"
        },
        {
            "name": "WFMT Chicago",
            "url": "https://wfmt.leanstream.co/WFMTMP3-1",
            "genre": "Classical",
            "source": "Additional"
        },
        {
            "name": "KUSC Los Angeles",
            "url": "https://stream.kusc.org/kusc-hi",
            "genre": "Classical",
            "source": "Additional"
        },
        {
            "name": "Radio Swiss Pop",
            "url": "https://stream.srg-ssr.ch/m/rsp/aacp_96",
            "genre": "Pop",
            "source": "Additional"
        },
        {
            "name": "Radio Caprice",
            "url": "http://79.111.14.76:8002/instrumental",
            "genre": "Instrumental",
            "source": "Additional"
        },
        {
            "name": "Venice Classic Radio",
            "url": "http://174.36.206.197:8000/listen.pls",
            "genre": "Classical",
            "source": "Additional"
        },
        {
            "name": "Flux FM",
            "url": "https://streams.fluxfm.de/live/mp3-320/streams.fluxfm.de/",
            "genre": "Alternative",
            "source": "Additional"
        },
        {
            "name": "Radio Tunes - Jazz",
            "url": "http://pub8.radiotunes.com:80/radiotunes_jazz",
            "genre": "Jazz",
            "source": "Additional"
        }
    ]
    
    # Crear instancia del tester
    tester = AdditionalRadioTester()
    
    # Ejecutar pruebas
    print("=" * 80)
    print("🎵 VERIFICACIÓN DE EMISORAS ADICIONALES DE ALTA CALIDAD")
    print("=" * 80)
    
    resultados = tester.test_stations_batch(emisoras_adicionales)
    
    # Guardar resultados
    with open('data/verificacion_emisoras_adicionales.json', 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    
    # Mostrar resumen
    print("\n" + "=" * 80)
    print("📊 RESUMEN DE EMISORAS ADICIONALES")
    print("=" * 80)
    
    conectadas = [r for r in resultados if r.get('status') == 'CONECTADO']
    fallidas = [r for r in resultados if r.get('status') == 'ERROR']
    
    print(f"✅ Emisoras adicionales conectadas: {len(conectadas)}")
    print(f"❌ Emisoras con problemas: {len(fallidas)}")
    
    # Mostrar emisoras conectadas ordenadas por confiabilidad
    conectadas_ordenadas = sorted(conectadas, key=lambda x: x.get('reliability_score', 0), reverse=True)
    
    print(f"\n🏆 EMISORAS ADICIONALES MÁS CONFIABLES:")
    for i, emisora in enumerate(conectadas_ordenadas, 1):
        score = emisora.get('reliability_score', 0)
        bitrate = emisora.get('bitrate', 'N/A')
        formato = emisora.get('format', 'N/A')
        print(f"{i:2d}. {emisora['station_name']:<30} | Score: {score}/10 | {bitrate} {formato}")
    
    print(f"\n📁 Resultados guardados en: data/verificacion_emisoras_adicionales.json")

if __name__ == "__main__":
    main()
