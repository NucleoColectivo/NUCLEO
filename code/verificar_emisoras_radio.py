#!/usr/bin/env python3
"""
Script para verificar la calidad y funcionalidad de emisoras de radio online
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

class RadioStationTester:
    def __init__(self):
        self.results = []
        self.timeout = 15  # timeout en segundos
        
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
            print(f"🔍 Probando conectividad: {station_name}")
            
            # Configurar request
            req = urllib.request.Request(url, headers=self.get_headers())
            
            # Intentar conexión
            with urllib.request.urlopen(req, timeout=self.timeout) as response:
                # Obtener headers de respuesta
                headers = dict(response.headers)
                status_code = response.getcode()
                
                # Leer una pequeña muestra del stream
                sample_data = response.read(1024)
                
                # Analizar información del stream
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
                    'icy_description': headers.get('icy-description', 'No especificado'),
                    'icy_url': headers.get('icy-url', 'No especificado'),
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
        
        # Detectar bitrate
        if 'icy-br' in headers:
            info['bitrate'] = f"{headers['icy-br']}kbps"
        
        # Detectar formato basado en content-type
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
        
        # Status code válido
        if status_code == 200:
            score += 3
        
        # Tiene datos de stream
        if sample_size > 0:
            score += 2
        
        # Tiene información ICY (metadatos de radio)
        if headers.get('icy-name'):
            score += 1
        if headers.get('icy-br'):
            score += 1
        if headers.get('icy-genre'):
            score += 1
        
        # Content type válido
        content_type = headers.get('content-type', '').lower()
        if any(audio_type in content_type for audio_type in ['audio', 'mp3', 'aac', 'ogg', 'flac']):
            score += 2
        
        return min(score, 10)
    
    def test_stations_batch(self, stations):
        """Prueba múltiples estaciones en paralelo"""
        print(f"🚀 Iniciando prueba de {len(stations)} emisoras...")
        
        with ThreadPoolExecutor(max_workers=10) as executor:
            # Crear tareas
            futures = []
            for station in stations:
                future = executor.submit(
                    self.test_stream_connectivity, 
                    station['url'], 
                    station['name']
                )
                futures.append(future)
            
            # Recopilar resultados
            for future in as_completed(futures):
                try:
                    result = future.result(timeout=self.timeout + 5)
                    self.results.append(result)
                except Exception as e:
                    print(f"❌ Error en prueba paralela: {e}")
        
        return self.results
    
    def save_results(self, filename):
        """Guarda los resultados en JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        print(f"📄 Resultados guardados en: {filename}")

def main():
    """Función principal"""
    # Lista de emisoras conocidas para verificar
    emisoras_conocidas = [
        {
            "name": "SomaFM - Groove Salad",
            "url": "https://ice1.somafm.com/groovesalad-256-mp3",
            "genre": "Ambient/Chill"
        },
        {
            "name": "SomaFM - Deep Space One",
            "url": "https://ice1.somafm.com/deepspaceone-128-mp3",
            "genre": "Ambient/Space"
        },
        {
            "name": "Radio Paradise - Main Mix",
            "url": "https://stream.radioparadise.com/aac-320",
            "genre": "Eclectic"
        },
        {
            "name": "Radio Paradise - FLAC",
            "url": "http://stream.radioparadise.com/flac",
            "genre": "Eclectic"
        },
        {
            "name": "KEXP Seattle",
            "url": "https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
            "genre": "Alternative/Indie"
        },
        {
            "name": "BBC Radio 1",
            "url": "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
            "genre": "Pop/Rock"
        },
        {
            "name": "BBC Radio 6 Music",
            "url": "https://stream.live.vc.bbcmedia.co.uk/bbc_6music",
            "genre": "Alternative"
        },
        {
            "name": "FIP Radio France",
            "url": "https://icecast.radiofrance.fr/fip-hifi.aac",
            "genre": "Eclectic"
        },
        {
            "name": "WFMU",
            "url": "https://stream0.wfmu.org/freeform-128k",
            "genre": "Freeform"
        },
        {
            "name": "WNYC FM",
            "url": "https://fm939.wnyc.org/wnycfm",
            "genre": "Public Radio"
        },
        {
            "name": "KCRW",
            "url": "https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air",
            "genre": "Eclectic"
        },
        {
            "name": "Radio Swiss Jazz",
            "url": "https://stream.srg-ssr.ch/m/rsj/aacp_96",
            "genre": "Jazz"
        },
        {
            "name": "NTS Radio 1",
            "url": "https://stream-relay-geo.ntslive.net/stream",
            "genre": "Experimental"
        },
        {
            "name": "Worldwide FM",
            "url": "https://worldwidefm.out.airtime.pro/worldwidefm_a",
            "genre": "Global"
        },
        {
            "name": "Rinse FM",
            "url": "https://streamer-01.rinse.fm/rinse",
            "genre": "Electronic/Urban"
        }
    ]
    
    # Emisoras adicionales de alta calidad encontradas
    emisoras_alta_calidad = [
        {
            "name": "Radio Paradise - Mellow FLAC",
            "url": "http://stream.radioparadise.com/mellow-flac",
            "genre": "Mellow"
        },
        {
            "name": "Radio Paradise - Rock FLAC",
            "url": "http://stream.radioparadise.com/rock-flac",
            "genre": "Rock"
        },
        {
            "name": "60North Radio",
            "url": "http://r5.zetcast.net/flac",
            "genre": "Indie"
        },
        {
            "name": "95bFM",
            "url": "https://streams.95bfm.com/stream112",
            "genre": "Alternative"
        },
        {
            "name": "Czech Radio Jazz",
            "url": "http://amp.cesnet.cz:8000/cro-jazz.flac",
            "genre": "Jazz"
        },
        {
            "name": "Dance Wave",
            "url": "http://dancewave.online/dance.flac.ogg",
            "genre": "Electronic/Dance"
        },
        {
            "name": "Naim Jazz",
            "url": "http://mscp3.live-streams.nl:8340/jazz-flac.flac",
            "genre": "Jazz"
        },
        {
            "name": "Naim Classical",
            "url": "http://mscp3.live-streams.nl:8250/class-flac.flac",
            "genre": "Classical"
        },
        {
            "name": "Mother Earth Radio",
            "url": "https://motherearth.streamserver24.com/listen/motherearth/motherearth",
            "genre": "Eclectic"
        },
        {
            "name": "Radio Calico",
            "url": "http://radio3.radio-calico.com:8080/calico",
            "genre": "Rock/Pop"
        }
    ]
    
    # Combinar todas las emisoras
    todas_emisoras = emisoras_conocidas + emisoras_alta_calidad
    
    # Crear instancia del tester
    tester = RadioStationTester()
    
    # Ejecutar pruebas
    print("=" * 80)
    print("🎵 VERIFICACIÓN DE EMISORAS DE RADIO ONLINE")
    print("=" * 80)
    
    resultados = tester.test_stations_batch(todas_emisoras)
    
    # Guardar resultados
    tester.save_results('data/verificacion_emisoras_resultados.json')
    
    # Mostrar resumen
    print("\n" + "=" * 80)
    print("📊 RESUMEN DE RESULTADOS")
    print("=" * 80)
    
    conectadas = [r for r in resultados if r.get('status') == 'CONECTADO']
    fallidas = [r for r in resultados if r.get('status') == 'ERROR']
    
    print(f"✅ Emisoras conectadas: {len(conectadas)}")
    print(f"❌ Emisoras con problemas: {len(fallidas)}")
    
    # Mostrar top 10 por confiabilidad
    conectadas_ordenadas = sorted(conectadas, key=lambda x: x.get('reliability_score', 0), reverse=True)
    
    print(f"\n🏆 TOP 10 EMISORAS MÁS CONFIABLES:")
    for i, emisora in enumerate(conectadas_ordenadas[:10], 1):
        score = emisora.get('reliability_score', 0)
        bitrate = emisora.get('bitrate', 'N/A')
        formato = emisora.get('format', 'N/A')
        print(f"{i:2d}. {emisora['station_name']:<30} | Score: {score}/10 | {bitrate} {formato}")
    
    print(f"\n📁 Resultados completos guardados en: data/verificacion_emisoras_resultados.json")

if __name__ == "__main__":
    main()
