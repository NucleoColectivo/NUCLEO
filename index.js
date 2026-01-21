import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Menu, X, ArrowRight, Instagram, Mail, 
  ExternalLink, Layers, Cpu, BookOpen, Users, 
  Lightbulb, Globe, ChevronRight, FileText, 
  Mic, Video, ArrowUpRight, Maximize2, Play, Pause, Volume2, Radio,
  Signal, Wifi, Disc, Linkedin, Globe as GlobeIcon, Facebook,
  Bot, Activity, Zap, BarChart2, Minimize2, Beaker, Store, Network, Paintbrush, GraduationCap, Rocket, TrendingUp, ShieldCheck, LayoutTemplate, BrainCircuit, Rotate3d, Sparkles, MessageCircle, Sliders, Calculator, Check, DollarSign, Clock, MapPin, Camera, Settings, Calendar, Lock, User
} from 'lucide-react';

// --- CONFIGURACIÓN DJ AUTOMÁTICO & BIENVENIDA ---
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/RADIO/audio/";
const WELCOME_FILENAME = "t2a_¡Bienvenid_20250608_072417.mp3";
const WELCOME_DJ_URL = `${GITHUB_RAW_BASE}${encodeURIComponent(WELCOME_FILENAME)}`;

const DJ_MESSAGES = [
  `${GITHUB_RAW_BASE}mensaje_identificacion.mp3`,
  `${GITHUB_RAW_BASE}cuña_arte_tecnologia.mp3`,
  `${GITHUB_RAW_BASE}separador_radio.mp3`,
  `${GITHUB_RAW_BASE}mensaje_comunidad.mp3`
];

const DJ_INTERVAL_MINUTES = 3; 

// --- COLORES DE MARCA ---
const BRAND = {
  yellow: '#F8C300', // Amarillo del Logo
  purple: '#4C0299', // Morado del Logo
  purpleLight: '#8B5CF6', // Versión más clara
  black: '#0a0a0a',
  white: '#ffffff'
};

// --- DATOS REALES DE EMISORAS ---
const STATIONS_DATA = [
  {
    category: "Global Experimental (Verificadas)",
    stations: [
      { id: 'nts', title: 'NTS Radio', location: 'Londres / Global', url: 'https://stream-relay-geo.ntslive.net/stream', description: 'Plataforma global de radio experimental.', tags: ['Underground', 'Eclectic'] },
      { id: 'dublab', title: 'Dublab', location: 'Los Ángeles', url: 'https://dublab.out.airtime.pro/dublab_a', description: 'Radio experimental comunitaria pionera.', tags: ['Freeform', 'Community'] },
      { id: 'thelot', title: 'The Lot Radio', location: 'Nueva York', url: 'https://thelot.out.airtime.pro/thelot_a', description: 'Streaming desde un contenedor en Brooklyn.', tags: ['Electronic', 'Disco'] },
      { id: 'rinse', title: 'Rinse FM', location: 'Londres', url: 'https://streamer.dgen.net/rinsefm', description: 'El corazón de la música underground británica.', tags: ['Grime', 'Bass'] },
      { id: 'soma', title: 'SomaFM: Drone Zone', location: 'San Francisco', url: 'http://ice1.somafm.com/dronezone-128-mp3', description: 'Texturas atmosféricas y ambientales.', tags: ['Ambient', 'Drone'] }
    ]
  },
  {
    category: "Latinoamérica & Colombia",
    stations: [
      { id: 'radiotonico', title: 'Radiotónico', location: 'México', url: 'https://s2.radio.co/s325d53958/listen', description: 'Investigación musical y locución experimental.', tags: ['Experimental', 'Talk'] },
      { id: 'tsonami', title: 'Radio Tsonami', location: 'Chile', url: 'https://stream.tsonami.cl/radio', description: 'Enfoque en paisaje sonoro y experimentación.', tags: ['Sound Art', 'Field Recording'] },
      { id: 'red_radar', title: 'Red Radar (Mix)', location: 'Norte de Santander', url: '#', description: 'Señal comunitaria de la red regional.', tags: ['Comunitaria', 'Territorio'] }
    ]
  },
  {
    category: "Europa & Vanguardia",
    stations: [
      { id: 'lyl', title: 'LYL Radio', location: 'Lyon, Francia', url: 'https://icecast.lyl.live/live', description: 'Nativa de Lyon, enfoque experimental.', tags: ['Avant-garde', 'French'] },
      { id: 'relativa', title: 'Radio Relativa', location: 'Madrid', url: 'https://stream.radiorelativa.eu/stream', description: 'Emisora experimental ibérica.', tags: ['Experimental', 'Club'] },
      { id: 'cashmere', title: 'Cashmere Radio', location: 'Berlín', url: 'https://cashmereradio.out.airtime.pro/cashmereradio_a', description: 'Radio experimental berlinesa.', tags: ['Electronic', 'Art'] }
    ]
  }
];

// Datos de Miembros y Proyectos
const MEMBERS = [
  {
    id: 'manuel',
    name: 'Manuel Palacio',
    role: 'Artista · Diseñador · Creador Cultural',
    bio: 'Enfocado en la intersección entre arte, tecnología y procesos creativos contemporáneos. Su trabajo abarca ilustración, instalaciones interactivas y narrativa visual con IA.',
    tags: ['Ilustración', 'Instalaciones Interactivas', 'IA Creativa', 'Dirección de Arte'],
    image: 'https://placehold.co/600x800/111/fff?text=Manuel+Palacio',
    social: {
      instagram: ['https://www.instagram.com/manuelpalacio/'],
      website: 'https://nucleocolectivo.github.io/PORTAFOLIO/',
      tiktok: 'https://www.tiktok.com/@manuel.palacio63?lang=es-419',
      behance: null
    }
  },
  {
    id: 'carlos',
    name: 'Carlos Londoño',
    role: 'Artista · Creador · Investigador Visual',
    bio: 'Su práctica se centra en la exploración visual y conceptual. Desarrolla proyectos experimentales en diálogo constante con contextos culturales y sociales.',
    tags: ['Investigación Visual', 'Proyectos Experimentales', 'Contexto Social', 'Archivo'],
    image: 'https://placehold.co/600x800/111/fff?text=Carlos+Londoño',
    social: {
      instagram: [
        'https://www.instagram.com/carlos.londor/',
        'https://www.instagram.com/medellin.distopico/',
        'https://www.instagram.com/ensayos.sobreelcuerpo/'
      ],
      facebook: 'https://www.facebook.com/carlos.a.londono.77',
      website: null,
      tiktok: null
    }
  }
];

const PROJECTS = [
  {
    id: 'vj_system',
    title: 'Malla Sónica 4.0',
    category: 'Software / Live Coding',
    year: '2026',
    description: 'Sistema de visualización audio-reactiva en tiempo real.',
    fullDescription: 'Un entorno digital vivo que transforma frecuencias sonoras en topografías tridimensionales. Desarrollado como una herramienta VJ de código abierto para el colectivo, permite la interacción mediante audio, cámara web y sensores de movimiento (giroscopio).',
    specs: ['React Three Fiber', 'Web Audio API', 'Computer Vision', 'Canvas API'],
    credits: 'Desarrollo: Núcleo Lab / Concepto: Manuel Palacio',
    activation: 'Ejecutable Web (Full Screen)',
    image: 'https://placehold.co/800x600/000000/00ff88?text=Malla+Sonica+4.0',
    isInteractive: true
  },
  {
    id: 1,
    title: 'Resonancias Latentes',
    category: 'Instalación Interactiva',
    year: '2025',
    description: 'Exploración de frecuencias sonoras y visuales generativas.',
    fullDescription: 'Una investigación profunda sobre cómo el sonido invisible esculpe la materia visible. La pieza utiliza algoritmos generativos para traducir el ruido ambiente de la sala en topografías visuales en tiempo real. La obra cuestiona nuestra percepción de la realidad, sugiriendo que lo que vemos es solo una fracción del espectro vibratorio que nos rodea.',
    specs: ['TouchDesigner', 'Proyección 4K', 'Sensores de Audio', 'Espacio Mínimo: 4x4m'],
    credits: 'Dirección: Manuel Palacio / Sonido: Carlos Londoño',
    activation: 'Instalación inmersiva para museos, galerías o festivales de luz.',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Resonancias'
  },
  {
    id: 2,
    title: 'Cartografías del Olvido',
    category: 'Obra Gráfica / Digital',
    year: '2024',
    description: 'Serie de ilustraciones digitales sobre la memoria urbana.',
    fullDescription: 'Serie gráfica que documenta arquitecturas demolidas de Medellín, reconstruidas digitalmente a partir de relatos orales y archivos fragmentados. Cada pieza actúa como un monumento digital a lo que ya no existe, utilizando la ilustración como herramienta de preservación histórica y emocional.',
    specs: ['Impresión Giclée', 'Papel Algodón', 'Realidad Aumentada (App)'],
    credits: 'Ilustración: Manuel Palacio / Investigación: Equipo Núcleo',
    activation: 'Exhibición en sala + Activación con dispositivos móviles.',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Cartografias'
  },
  {
    id: 3,
    title: 'Sintaxis Artificial',
    category: 'IA / Proceso',
    year: '2025',
    description: 'Investigación sobre el lenguaje visual de las redes neuronales.',
    fullDescription: 'Un ensayo visual sobre los errores (glitches) y alucinaciones de los modelos de IA generativa. El proyecto explora los límites semánticos de la máquina, forzando al algoritmo a interpretar conceptos abstractos humanos como "nostalgia", "deja vu" o "silencio", revelando la poética del error computacional.',
    specs: ['Video Loop', 'Pantallas Verticales', 'Modelos Stable Diffusion Custom'],
    credits: 'Concepto y Prompting: Núcleo Lab',
    activation: 'Videoinstalación o pieza NFT dinámica.',
    image: 'https://placehold.co/800x600/1a1a1a/ffffff?text=Sintaxis+IA'
  }
];

const SPECIAL_PROJECTS = [
  {
    id: 'cosiaca',
    title: 'Cosiaca 350',
    subtitle: 'Universo Narrativo',
    description: 'Un proyecto que cruza humor, cultura popular y memoria colectiva, creando una línea editorial con identidad propia.',
    color: 'bg-[#F8C300]' 
  }
];

// --- COMPONENTES AUXILIARES ---

const SectionTitle = ({ children, subtitle, dark = false }) => (
  <div className="mb-12 md:mb-16">
    <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase ${dark ? 'text-white' : 'text-neutral-900'}`}>{children}</h2>
    {subtitle && <p className={`text-xl max-w-2xl font-light ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{subtitle}</p>}
    <div className={`h-1 w-20 mt-6 ${dark ? 'bg-[#F8C300]' : 'bg-[#4C0299]'}`}></div>
  </div>
);

const SocialButton = ({ icon: Icon, url, label }) => {
  if (!url) return null;
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="p-2 border border-neutral-300 rounded-full hover:bg-[#4C0299] hover:text-white hover:border-[#4C0299] transition-colors group"
      aria-label={label}
    >
      <Icon size={18} className="text-neutral-600 group-hover:text-white transition-colors" />
    </a>
  );
};

const MultiInstagramButton = ({ urls }) => {
  if (!urls || urls.length === 0) return null;
  if (urls.length === 1) {
    return <SocialButton icon={Instagram} url={urls[0]} label="Instagram" />;
  }
  return (
    <div className="relative group">
      <button className="p-2 border border-neutral-300 rounded-full hover:bg-[#4C0299] hover:text-white hover:border-[#4C0299] transition-colors group-hover:bg-[#4C0299] group-hover:text-white">
        <Instagram size={18} className="text-neutral-600 group-hover:text-white transition-colors" />
      </button>
      <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-neutral-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden z-10">
        {urls.map((url, index) => {
          const username = url.split('.com/')[1]?.replace(/\/$/, '') || 'Perfil';
          return (
            <a 
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-mono hover:bg-neutral-100 text-left truncate flex items-center gap-2"
            >
              <Instagram size={12} />
              @{username}
            </a>
          );
        })}
      </div>
    </div>
  );
};

// --- MODALES ---

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl relative z-10 animate-fade-in-up flex flex-col md:flex-row overflow-hidden shadow-2xl">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 bg-black text-white p-2 rounded-full hover:bg-[#F8C300] hover:text-black transition-colors"
        >
            <X size={24}/>
        </button>
        
        {/* Imagen Lateral */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-neutral-900">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                 <span className="text-[#F8C300] font-mono text-xs uppercase tracking-widest mb-1 block">{project.category}</span>
                 <h2 className="text-3xl font-black text-white leading-tight">{project.title}</h2>
            </div>
        </div>

        {/* Contenido */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
            <div className="flex items-center gap-4 mb-8 border-b border-neutral-100 pb-4">
                <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded text-xs font-bold uppercase">{project.year}</span>
                <span className="flex items-center gap-2 text-xs font-bold text-[#4C0299] uppercase"><ShieldCheck size={14}/> Proyecto Verificado</span>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-bold uppercase text-xs text-neutral-400 mb-2">Concepto</h3>
                    <p className="text-lg leading-relaxed text-neutral-800">{project.fullDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold uppercase text-xs text-neutral-400 mb-2 flex items-center gap-2"><Cpu size={14}/> Tecnología</h3>
                        <ul className="space-y-1">
                            {project.specs.map(spec => (
                                <li key={spec} className="text-sm text-neutral-600 border-l-2 border-[#F8C300] pl-2">{spec}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold uppercase text-xs text-neutral-400 mb-2 flex items-center gap-2"><Users size={14}/> Créditos</h3>
                        <p className="text-sm text-neutral-600">{project.credits || "Equipo Núcleo Colectivo"}</p>
                    </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg mt-4 border border-neutral-100">
                    <h3 className="font-bold uppercase text-xs text-neutral-400 mb-2">Activación / Formato</h3>
                    <p className="text-sm text-neutral-700 italic">{project.activation}</p>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100 flex gap-4">
                <button className="bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-[#4C0299] transition-colors flex items-center gap-2">
                    Contactar para Exhibición <Mail size={16}/>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
};

const LoginModal = ({ onClose }) => {
    const [mode, setMode] = useState('login'); // login | register
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
          <div className="bg-white w-full max-w-md p-8 rounded-2xl relative z-10 animate-fade-in-up shadow-2xl">
              <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-black"><X size={20}/></button>
              
              <div className="text-center mb-8">
                  <h2 className="text-2xl font-black mb-2">{mode === 'login' ? 'ACCESO MIEMBROS' : 'UNIRSE AL NÚCLEO'}</h2>
                  <p className="text-neutral-500 text-sm">Plataforma de gestión para artistas y colaboradores.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {mode === 'register' && (
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Nombre Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-neutral-400" size={16}/>
                            <input type="text" className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded focus:border-black outline-none" placeholder="Tu nombre" />
                        </div>
                      </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Correo Electrónico</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-neutral-400" size={16}/>
                        <input type="email" className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded focus:border-black outline-none" placeholder="usuario@nucleo.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Contraseña</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-neutral-400" size={16}/>
                        <input type="password" className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded focus:border-black outline-none" placeholder="••••••••" />
                    </div>
                  </div>

                  <button className="w-full bg-[#4C0299] text-white py-3 font-bold uppercase tracking-wider hover:bg-black transition-colors rounded">
                      {mode === 'login' ? 'Ingresar' : 'Registrarse'}
                  </button>
              </form>

              <div className="mt-6 text-center text-xs text-neutral-500">
                  {mode === 'login' ? (
                      <p>¿No tienes cuenta? <button onClick={() => setMode('register')} className="font-bold text-black hover:underline">Solicitar Acceso</button></p>
                  ) : (
                      <p>¿Ya tienes cuenta? <button onClick={() => setMode('login')} className="font-bold text-black hover:underline">Iniciar Sesión</button></p>
                  )}
              </div>
          </div>
        </div>
    );
};

// --- MALLA SÓNICA 4.0 (VJ SYSTEM PORT) ---
const GravityMeshVisualizer = ({ embedded = false, audioAnalyser, showFullscreenToggle = false }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const requestRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    
    const config = useRef({ gridSize: 40, perspective: 900, baseZ: 200, dampening: 0.94, tension: 0.025, audioInfluence: 200, touchInfluence: 800, idleTimeout: 3000 });
    const state = useRef({ points: [], particles: [], width: 0, height: 0, mouseX: -9999, mouseY: -9999, gyroX: 0, gyroY: 0, isGyroActive: false, lastInteraction: Date.now(), isIdle: false, idlePhase: 0, dataArray: null, avgVol: 0 });
    const volBarRef = useRef(null);
    const modeRef = useRef(null);
    const sysMsgRef = useRef(null);
    const valRefs = useRef({});

    class Particle {
        constructor(w, h) { this.reset(w, h); }
        reset(w, h) { this.x = (Math.random() - 0.5) * w * 1.5; this.y = (Math.random() - 0.5) * h * 1.5; this.z = Math.random() * 1500 + 200; this.size = Math.random(); }
        update(speed, w, h) { this.z -= speed; if (this.z <= 1) this.reset(w, h); }
        draw(ctx, w, h) {
            const scale = config.current.perspective / (config.current.perspective + this.z);
            const sx = (this.x) * scale + w/2;
            const sy = (this.y) * scale + h/2;
            if (sx < 0 || sx > w || sy < 0 || sy > h) return;
            const opacity = Math.min(0.8, (1500 - this.z)/1000);
            ctx.fillStyle = `rgba(200, 255, 230, ${opacity})`;
            ctx.fillRect(sx, sy, this.size * 2, this.size * 2);
        }
    }

    class Point {
        constructor(x, y, z) { this.baseX = x; this.baseY = y; this.baseZ = z; this.currentZ = z; this.velocityZ = 0; }
        update(w, h) {
            const displacement = this.currentZ - this.baseZ;
            const force = -config.current.tension * displacement;
            this.velocityZ += force;
            this.velocityZ *= config.current.dampening;
            this.currentZ += this.velocityZ;
            let targetX = state.current.mouseX;
            let targetY = state.current.mouseY;
            let influence = config.current.touchInfluence;
            if (state.current.isGyroActive && state.current.mouseX < 0) { targetX = (0.5 + state.current.gyroX * 0.03) * w; targetY = (0.5 + state.current.gyroY * 0.03) * h; influence = config.current.touchInfluence * 0.8; }
            if (targetX > 0) {
                const scale = config.current.perspective / (config.current.perspective + this.currentZ + config.current.baseZ);
                const screenX = (this.baseX - w/2) * scale + w/2;
                const screenY = (this.baseY - h/2) * scale + h/2;
                const dx = screenX - targetX;
                const dy = screenY - targetY;
                if (Math.abs(dx) < 250 && Math.abs(dy) < 250) {
                     const distSq = dx*dx + dy*dy;
                     if (distSq < 62500) { const pull = (1 - Math.sqrt(distSq)/250) * influence; this.velocityZ += pull * 0.2; triggerInteraction(); }
                }
            }
        }
        applyForce(force) { this.velocityZ += force; if (Math.abs(force) > 2) triggerInteraction(); }
    }

    const triggerInteraction = () => {
        state.current.lastInteraction = Date.now();
        if (state.current.isIdle) { state.current.isIdle = false; if (modeRef.current) { modeRef.current.innerText = "MODO: AUDIO REACTIVO"; modeRef.current.style.color = "#00ff88"; } }
    };

    // Función Toggle Fullscreen Corregida para manejar errores de permisos
    const toggleFullscreen = () => {
      if (!containerRef.current) return;
      
      try {
          if (!document.fullscreenElement) {
            const requestFS = containerRef.current.requestFullscreen || 
                              containerRef.current.webkitRequestFullscreen || 
                              containerRef.current.mozRequestFullScreen ||
                              containerRef.current.msRequestFullscreen;
            
            if (requestFS) {
                Promise.resolve(requestFS.call(containerRef.current))
                .then(() => setIsFullscreen(true))
                .catch(err => {
                    console.warn("Fullscreen error (posiblemente bloqueado por iframe):", err);
                    // No hacemos nada, el usuario se queda en modo normal sin crash
                });
            }
          } else {
            const exitFS = document.exitFullscreen ||
                           document.webkitExitFullscreen ||
                           document.mozCancelFullScreen ||
                           document.msExitFullscreen;

            if (exitFS) {
                Promise.resolve(exitFS.call(document))
                .then(() => setIsFullscreen(false))
                .catch(err => console.warn("Exit Fullscreen error:", err));
            }
          }
      } catch (e) {
          console.warn("Error crítico en fullscreen:", e);
      }
    };

    useEffect(() => { if (audioAnalyser || embedded) initSystem(); }, [audioAnalyser, embedded]);

    const initSystem = async () => {
        if (!embedded && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') { try { } catch (e) { console.warn(e); } } 
        else if (!embedded && window.DeviceOrientationEvent) { state.current.isGyroActive = true; }
        if (audioAnalyser) state.current.dataArray = new Uint8Array(audioAnalyser.frequencyBinCount);
        else state.current.dataArray = new Uint8Array(128); 
        setIsRunning(true); createWorld(); animate();
    };

    const createWorld = () => {
        if (!canvasRef.current || !containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        canvasRef.current.width = width; canvasRef.current.height = height; state.current.width = width; state.current.height = height;
        state.current.points = []; state.current.particles = [];
        const range = Math.max(width, height) * 1.2; const step = range / config.current.gridSize;
        for (let y = 0; y < config.current.gridSize; y++) { for (let x = 0; x < config.current.gridSize; x++) { const pX = (x - config.current.gridSize/2) * step + width/2; const pY = (y - config.current.gridSize/2) * step + height/2; state.current.points.push(new Point(pX, pY, 0)); } }
        for(let i=0; i<100; i++) state.current.particles.push(new Particle(width, height));
    };

    const animate = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d', { alpha: false });
        const { width, height, dataArray, points, particles } = state.current;
        const { gridSize, audioInfluence, idleTimeout } = config.current;
        if (embedded) { ctx.clearRect(0, 0, width, height); ctx.fillStyle = 'rgba(5, 5, 8, 0.4)'; ctx.fillRect(0, 0, width, height); } else { ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, width, height); }
        if (audioAnalyser) { try { audioAnalyser.getByteFrequencyData(dataArray); let sum = 0; for(let i=0; i<dataArray.length; i++) sum += dataArray[i]; const rawAvg = sum / dataArray.length; if (rawAvg === 0 && !state.current.isIdle) { const time = Date.now() * 0.005; state.current.avgVol = (Math.sin(time) * 0.5 + 0.5) * 30; } else { state.current.avgVol = rawAvg; } } catch(e) { state.current.avgVol = 0; } } else { const time = Date.now() * 0.002; state.current.avgVol = (Math.sin(time * 2) * 0.5 + 0.5) * 20; }
        if (volBarRef.current) volBarRef.current.style.width = Math.min(100, state.current.avgVol * 1.5) + '%';
        if (state.current.avgVol > 10) triggerInteraction();
        if (Date.now() - state.current.lastInteraction > idleTimeout) { if (!state.current.isIdle) { state.current.isIdle = true; if (modeRef.current) { modeRef.current.innerText = "ESPERANDO SEÑAL..."; modeRef.current.style.color = "#00ccff"; } if (sysMsgRef.current) sysMsgRef.current.style.opacity = "1"; } state.current.idlePhase += 0.05; } else { if (sysMsgRef.current) sysMsgRef.current.style.opacity = "0"; }
        const pSpeed = 2 + (state.current.avgVol / 20); particles.forEach(p => { p.update(pSpeed, width, height); p.draw(ctx, width, height); });
        ctx.lineWidth = 1; let pIndex = 0; const time = Date.now() * 0.002; const projX = new Float32Array(points.length); const projY = new Float32Array(points.length); const projScale = new Float32Array(points.length);
        for (let y = 0; y < gridSize; y++) { for (let x = 0; x < gridSize; x++) { const p = points[pIndex]; const distCenter = Math.sqrt(Math.pow(x - gridSize/2, 2) + Math.pow(y - gridSize/2, 2)); if (state.current.avgVol > 5) { const wave = Math.sin(distCenter * 0.5 - time * 5); p.applyForce(wave * (state.current.avgVol/255) * audioInfluence * 0.1); } if (state.current.isIdle) { const breath = Math.sin(x * 0.3 + state.current.idlePhase) * Math.cos(y * 0.3 + state.current.idlePhase); p.velocityZ += breath * 0.5; } p.update(width, height); const scale = config.current.perspective / (config.current.perspective + p.currentZ + config.current.baseZ); projX[pIndex] = (p.baseX - width/2) * scale + width/2; projY[pIndex] = (p.baseY - height/2) * scale + height/2; projScale[pIndex] = scale; pIndex++; } }
        for (let y = 0; y < gridSize; y++) { for (let x = 0; x < gridSize; x++) { const i = y * gridSize + x; if (projScale[i] <= 0) continue; const px = projX[i]; const py = projY[i]; if (px < -100 || px > width+100 || py < -100 || py > height+100) continue; const depth = Math.abs(points[i].currentZ); let r, g, b; if (state.current.isIdle) { r=0; g=200; b=255; } else { r = depth > 50 ? 50 : 0; g = 255; b = depth > 50 ? 255 : 136; } const alpha = Math.min(1, 0.1 + (depth/100) + (state.current.avgVol/300)); ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`; ctx.beginPath(); if (x < gridSize - 1 && projScale[i+1] > 0) { ctx.moveTo(px, py); ctx.lineTo(projX[i+1], projY[i+1]); } if (y < gridSize - 1 && projScale[i+gridSize] > 0) { ctx.moveTo(px, py); ctx.lineTo(projX[i+gridSize], projY[i+gridSize]); } ctx.stroke(); } }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => { const handleResize = () => createWorld(); const handleMouseMove = (e) => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); state.current.mouseX = e.clientX - rect.left; state.current.mouseY = e.clientY - rect.top; } else { state.current.mouseX = e.clientX; state.current.mouseY = e.clientY; } }; const handleTouchMove = (e) => { if (containerRef.current) { const rect = containerRef.current.getBoundingClientRect(); state.current.mouseX = e.touches[0].clientX - rect.left; state.current.mouseY = e.touches[0].clientY - rect.top; } }; const handleTouchEnd = () => { state.current.mouseX = -9999; }; const handleFullscreenChange = () => { setIsFullscreen(!!document.fullscreenElement); setTimeout(createWorld, 100); }; window.addEventListener('resize', handleResize); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('touchmove', handleTouchMove, {passive: false}); window.addEventListener('touchend', handleTouchEnd); document.addEventListener('fullscreenchange', handleFullscreenChange); return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('touchmove', handleTouchMove); window.removeEventListener('touchend', handleTouchEnd); document.removeEventListener('fullscreenchange', handleFullscreenChange); if (requestRef.current) cancelAnimationFrame(requestRef.current); }; }, []);
    const updateVal = (key, val) => { config.current[key] = parseFloat(val); if (valRefs.current[key]) valRefs.current[key].innerText = val; };

    return (
        <div ref={containerRef} className={embedded ? "absolute inset-0 z-0 overflow-hidden rounded-xl bg-black" : "fixed inset-0 z-50 bg-[#050508] text-white font-mono overflow-hidden"}>
            <div className="absolute inset-0 pointer-events-none z-10 opacity-60" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))', backgroundSize: '100% 4px'}}></div>
            <canvas ref={canvasRef} className="block w-full h-full relative z-0" />
            {!embedded && <div ref={sysMsgRef} className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-white/30 tracking-[0.2em] pointer-events-none z-20 transition-opacity duration-500">SISTEMA EN REPOSO - ACÉRCATE</div>}
            {!isRunning && !embedded && (<div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-radial-gradient from-[#1a1a2e] to-black text-center p-6"><button onClick={() => initSystem()} className="bg-transparent border-2 border-[#00ff88] text-[#00ff88] px-10 py-4 text-lg font-bold tracking-[4px] uppercase hover:bg-[#00ff88] hover:text-black hover:shadow-[0_0_30px_#00ff88] transition-all">INICIAR VISUALIZADOR</button></div>)}
            {/* Fullscreen Button: Visible if not embedded OR if explicit prop is passed */}
            {(!embedded || showFullscreenToggle) && <button onClick={toggleFullscreen} className="absolute bottom-6 right-6 z-50 p-2 text-[#00ff88] border border-[#00ff88] rounded hover:bg-[#00ff88] hover:text-black transition-colors" title="Alternar Pantalla Completa">{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>}
            {(isRunning && (!embedded || isFullscreen)) && (
                <div className="absolute inset-0 z-40 pointer-events-none p-4 flex flex-col justify-between">
                    <div className="pointer-events-auto bg-[#05050a]/85 border border-[#00ff88]/30 p-4 rounded backdrop-blur-sm w-full max-w-[280px] shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center cursor-pointer group mb-2" onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}><h3 className="text-white font-bold text-xs tracking-widest select-none">PARAMETROS_CORE</h3><div className="text-[#00ff88] text-xs font-mono">[{isMenuCollapsed ? '+' : '-'}]</div></div>
                        {!isMenuCollapsed && (<div className="space-y-4 animate-fade-in"><div><div className="flex justify-between text-[10px] text-[#00ff88] font-bold mb-1"><span>GANANCIA AUDIO</span><span ref={el => valRefs.current['audioInfluence'] = el}>200</span></div><input type="range" className="w-full" min="0" max="500" defaultValue="200" onChange={(e) => updateVal('audioInfluence', e.target.value)} /></div><div><div className="flex justify-between text-[10px] text-[#00ff88] font-bold mb-1"><span>TENSIÓN MALLA</span><span ref={el => valRefs.current['tension'] = el}>0.025</span></div><input type="range" className="w-full" min="0.005" max="0.1" step="0.005" defaultValue="0.025" onChange={(e) => updateVal('tension', e.target.value)} /></div></div>)}
                        <div className="flex gap-4 mt-2 border-t border-white/10 pt-3"><div className="flex items-center text-[10px] text-gray-500 font-bold"><span className={`w-2 h-2 rounded-full mr-1 ${audioAnalyser ? 'bg-[#00ff88] shadow-[0_0_8px_#00ff88]' : 'bg-red-500'}`}></span>AUDIO_SOURCE: {audioAnalyser ? 'INTERNAL' : 'OFFLINE'}</div></div>
                    </div>
                    <div className="self-end pointer-events-auto bg-[#05050a]/85 border border-[#00ff88]/30 p-4 rounded backdrop-blur-sm min-w-[160px] text-right"><div className="text-[10px] text-gray-500 mb-1 tracking-widest">ESTADO</div><div ref={modeRef} className="text-sm font-bold text-[#00ff88] mb-3 animate-pulse">{audioAnalyser ? 'SISTEMA ONLINE' : 'MODO SIMULACIÓN'}</div><div className="text-[10px] text-gray-500 mb-1 tracking-widest">ENERGÍA ACÚSTICA</div><div className="h-1 w-full bg-gray-800 overflow-hidden"><div ref={volBarRef} className="h-full bg-[#00ff88] w-0 transition-all duration-75"></div></div></div>
                </div>
            )}
        </div>
    );
};

// --- RADIO PLAYER (Sin cambios, solo referencia) ---
const RadioPlayer = ({ currentStation, isPlaying, onTogglePlay, isExpanded, setIsExpanded, onAnalyserReady }) => {
  const streamRef = useRef(new Audio());
  const djRef = useRef(new Audio());
  const [djActive, setDjActive] = useState(false);
  const [welcomePlayed, setWelcomePlayed] = useState(false);
  const [lastDjTime, setLastDjTime] = useState(Date.now());
  const [isInitializing, setIsInitializing] = useState(false);
  const [countdown, setCountdown] = useState('');
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    streamRef.current.crossOrigin = "anonymous";
    const initAudioContext = () => {
        if (!audioCtxRef.current && isPlaying) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtxRef.current = new AudioContext();
                analyserRef.current = audioCtxRef.current.createAnalyser();
                analyserRef.current.fftSize = 256;
                sourceRef.current = audioCtxRef.current.createMediaElementSource(streamRef.current);
                sourceRef.current.connect(analyserRef.current);
                analyserRef.current.connect(audioCtxRef.current.destination);
                if (onAnalyserReady) onAnalyserReady(analyserRef.current);
            } catch (e) { console.warn("AudioContext Init Warning (CORS):", e); }
        } else if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') { audioCtxRef.current.resume(); }
    };
    if (isPlaying) initAudioContext();
  }, [isPlaying, onAnalyserReady]);

  useEffect(() => {
    if (!isPlaying || djActive || isInitializing) { setCountdown(''); return; }
    const timer = setInterval(() => {
        const nextTime = lastDjTime + DJ_INTERVAL_MINUTES * 60 * 1000;
        const diff = nextTime - Date.now();
        if (diff > 0) { const mins = Math.floor(diff / 60000); const secs = Math.floor((diff % 60000) / 1000); setCountdown(`-${mins}:${secs.toString().padStart(2, '0')} MIN`); } 
        else { setCountdown("EN CUALQUIER MOMENTO..."); }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, lastDjTime, djActive, isInitializing]);

  useEffect(() => {
    if (currentStation) {
      streamRef.current.src = currentStation.url;
      streamRef.current.volume = 1.0; 
      if (isPlaying && welcomePlayed && !djActive) { streamRef.current.play().catch(e => console.log("Stream Change Play Error:", e)); }
    }
  }, [currentStation]);

  useEffect(() => {
    if (!isPlaying) { streamRef.current.pause(); djRef.current.pause(); return; }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    if (!welcomePlayed && !isInitializing && !djActive) playWelcomeSequence();
    else if (welcomePlayed && !djActive && !isInitializing) streamRef.current.play().catch(e => console.log("Stream Resume Error:", e));
    else if (djActive && !isInitializing) djRef.current.play().catch(e => console.log("DJ Resume Error:", e));
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || !welcomePlayed || djActive || isInitializing) return;
    const checkInterval = setInterval(() => { if ((Date.now() - lastDjTime) / 1000 / 60 >= DJ_INTERVAL_MINUTES) triggerAutoDJ(); }, 10000); 
    return () => clearInterval(checkInterval);
  }, [isPlaying, welcomePlayed, lastDjTime, djActive, isInitializing]);

  const startMainStream = () => { streamRef.current.volume = 1.0; streamRef.current.play().catch(e => console.log("Error fatal iniciando stream:", e)); };

  const playWelcomeSequence = () => {
    setIsInitializing(true); setDjActive(true); streamRef.current.pause();
    djRef.current.src = WELCOME_DJ_URL; djRef.current.volume = 1.0;
    const cleanupAndStartRadio = () => { djRef.current.removeEventListener('ended', handleEnded); djRef.current.removeEventListener('error', handleError); setWelcomePlayed(true); setDjActive(false); setIsInitializing(false); setLastDjTime(Date.now()); startMainStream(); };
    const handleEnded = () => cleanupAndStartRadio();
    const handleError = (e) => cleanupAndStartRadio();
    djRef.current.addEventListener('ended', handleEnded); djRef.current.addEventListener('error', handleError);
    djRef.current.play().catch(e => cleanupAndStartRadio());
  };

  const triggerAutoDJ = () => {
    if (DJ_MESSAGES.length === 0) return;
    setDjActive(true); djRef.current.src = DJ_MESSAGES[Math.floor(Math.random() * DJ_MESSAGES.length)];
    fadeVolume(streamRef.current, 0.2, 1000); 
    djRef.current.play().then(() => { djRef.current.onended = () => { fadeVolume(streamRef.current, 1.0, 1500); setDjActive(false); setLastDjTime(Date.now()); }; })
    .catch(e => { streamRef.current.volume = 1.0; setDjActive(false); setLastDjTime(Date.now()); });
  };

  const fadeVolume = (audioEl, targetVol, duration) => {
    const startVol = audioEl.volume; const steps = 20; const stepTime = duration / steps; const volStep = (targetVol - startVol) / steps; let currentStep = 0;
    const fadeInterval = setInterval(() => { currentStep++; const newVol = startVol + (volStep * currentStep); if (newVol >= 0 && newVol <= 1) audioEl.volume = newVol; if (currentStep >= steps) { clearInterval(fadeInterval); audioEl.volume = targetVol; } }, stepTime);
  };

  if (!currentStation) return null;

  return (
    <div className={`fixed bottom-0 right-0 z-[100] transition-all duration-500 ease-in-out ${isExpanded ? 'w-full md:w-96' : 'w-full md:w-auto'}`}>
      <div className="bg-black text-white shadow-2xl border-t border-neutral-800 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 h-16 bg-neutral-900 md:bg-black cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#F8C300] animate-pulse' : 'bg-[#4C0299]'}`}></div>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">EN EL AIRE</span>
                {djActive && (<span className="text-[10px] font-mono bg-[#4C0299] text-white px-1 rounded animate-pulse">{isInitializing ? "BIENVENIDA" : "DJ LIVE"}</span>)}
              </div>
              <span className="text-sm font-bold truncate max-w-[200px]">{currentStation.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button onClick={onTogglePlay} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">{isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}</button>
          </div>
        </div>
        {isExpanded && (
           <div className="bg-neutral-900 p-6 border-t border-neutral-800">
              <div className="flex justify-between items-start mb-4"><div><h4 className="text-xs font-mono text-neutral-500 mb-1">EMISORA</h4><p className="text-xl font-bold">{currentStation.title}</p></div><div className="text-right"><h4 className="text-xs font-mono text-neutral-500 mb-1">ORIGEN</h4><p className="text-sm">{currentStation.location}</p></div></div>
              <div className="flex items-center gap-2 mb-4 bg-neutral-800 p-3 rounded text-xs font-mono text-neutral-400"><Bot size={16} className={djActive ? "text-[#F8C300]" : "text-neutral-600"}/><span>AUTO DJ: {djActive ? <span className="text-[#F8C300]">{isInitializing ? "INICIANDO TRANSMISIÓN..." : "INTERVINIENDO..."}</span> : <span>ESPERANDO TURNO <span className="text-[#F8C300]">{countdown}</span></span>}</span></div>
              <p className="text-sm text-neutral-400 mb-6 font-light">{currentStation.description}</p>
              <div className="flex gap-2 mb-6">{currentStation.tags.map(tag => (<span key={tag} className="text-[10px] uppercase border border-neutral-700 px-2 py-1 rounded-full text-neutral-300">{tag}</span>))}</div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2"><span>LIVE STREAM</span><span>128 KBPS</span></div>
           </div>
        )}
      </div>
    </div>
  );
};

// --- VISTAS ---

// --- HOME VIEW (Restored) ---
const HomeView = ({ setView }) => (
  <div className="flex flex-col min-h-screen">
    <section className="flex-1 flex flex-col justify-center px-6 md:px-12 py-20 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-neutral-200 to-transparent rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="max-w-[1600px] mx-auto z-10 w-full animate-fade-in-up">
        {/* LOGO SVG INTEGRADO */}
        <div className="mb-8 max-w-sm">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 884.2 387.8" style={{ enableBackground: 'new 0 0 884.2 387.8' }} xmlSpace="preserve" className="w-full h-auto">
            <style type="text/css">
              {`
                .st0{fill:#F8C300;}
                .st1{fill:none;}
                .st2{fill:none;stroke:#000000;stroke-width:6.2965;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                .st3{fill:none;stroke:#000000;stroke-width:11.5436;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                .st4{fill:none;stroke:#000000;stroke-width:3.1482;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                .st5{fill:#000000;} 
                .st6{fill:#4C0299;}
                .st7{fill:none;stroke:#000000;stroke-width:6.2965;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} 
                .st8{fill:none;stroke:#000000;stroke-width:11.5436;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} 
                .st9{fill:none;stroke:#000000;stroke-width:3.1482;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} 
                .st10{font-family:'Montserrat', sans-serif;} 
                .st11{font-size:92.6267px; font-weight: 900;}
              `}
            </style>
            <g>
                <text transform="matrix(1 0 0 1 380.0714 196.4406)" className="st5 st10 st11">NÚCLEO</text>
                <path className="st5" d="M399.3,258.5c-2.2,0-4.2-0.4-6.1-1.1c-1.9-0.8-3.5-1.8-4.9-3.2c-1.4-1.4-2.4-3-3.2-4.8s-1.2-3.8-1.2-6
                  s0.4-4.1,1.2-6s1.8-3.4,3.2-4.8c1.4-1.4,3-2.4,4.9-3.2c1.9-0.8,3.9-1.1,6.1-1.1c2,0,3.8,0.3,5.6,0.9c1.8,0.6,3.3,1.6,4.6,2.9
                  l-0.5,0.6c-1.4-1.3-2.9-2.2-4.5-2.8c-1.6-0.5-3.3-0.8-5.2-0.8c-2,0-3.9,0.4-5.7,1.1c-1.8,0.7-3.3,1.7-4.6,3
                  c-1.3,1.3-2.3,2.8-3,4.5c-0.7,1.7-1.1,3.6-1.1,5.6c0,2,0.4,3.9,1.1,5.6c0.7,1.7,1.7,3.2,3,4.5c1.3,1.3,2.8,2.3,4.6,3
                  c1.8,0.7,3.7,1.1,5.7,1.1c1.8,0,3.5-0.3,5.2-0.8c1.6-0.6,3.1-1.5,4.5-2.8l0.5,0.6c-1.3,1.3-2.8,2.2-4.6,2.9
                  C403.1,258.2,401.3,258.5,399.3,258.5z"/>
                <path className="st5" d="M448.1,258.5c-2.2,0-4.2-0.4-6.1-1.1c-1.9-0.8-3.5-1.8-4.9-3.2c-1.4-1.4-2.4-3-3.2-4.8
                  c-0.8-1.8-1.1-3.8-1.1-6s0.4-4.1,1.1-6c0.8-1.8,1.8-3.4,3.2-4.8c1.4-1.4,3-2.4,4.9-3.2c1.9-0.8,3.9-1.1,6.1-1.1
                  s4.2,0.4,6.1,1.1c1.9,0.8,3.5,1.8,4.9,3.2c1.4,1.4,2.4,3,3.2,4.8s1.2,3.8,1.2,6s-0.4,4.1-1.2,6s-1.8,3.4-3.2,4.8
                  c-1.4,1.4-3,2.4-4.9,3.2C452.3,258.1,450.3,258.5,448.1,258.5z M448.1,257.7c2,0,3.9-0.4,5.7-1.1c1.8-0.7,3.3-1.7,4.6-3
                  c1.3-1.3,2.3-2.8,3-4.5c0.7-1.7,1.1-3.6,1.1-5.6s-0.4-3.9-1.1-5.6c-0.7-1.7-1.7-3.2-3-4.5c-1.3-1.3-2.8-2.3-4.6-3
                  s-3.7-1.1-5.7-1.1s-3.9,0.4-5.7,1.1s-3.3,1.7-4.6,3s-2.3,2.8-3,4.5c-0.7,1.7-1.1,3.6-1.1,5.6s0.4,3.9,1.1,5.6
                  c0.7,1.7,1.7,3.2,3,4.5c1.3,1.3,2.8,2.3,4.6,3C444.1,257.3,446,257.7,448.1,257.7z"/>
                <path className="st5" d="M490.5,258.4v-29.8h0.9v29h17.8v0.8H490.5z"/>
                <path className="st5" d="M534.1,258.4v-29.8h19.2v0.8h-18.4v28.2h19v0.8H534.1z M534.7,243.6v-0.8h16.7v0.8H534.7z"/>
                <path className="st5" d="M593.6,258.5c-2.2,0-4.2-0.4-6.1-1.1c-1.9-0.8-3.5-1.8-4.9-3.2c-1.4-1.4-2.4-3-3.2-4.8s-1.2-3.8-1.2-6
                  s0.4-4.1,1.2-6s1.8-3.4,3.2-4.8c1.4-1.4,3-2.4,4.9-3.2c1.9-0.8,3.9-1.1,6.1-1.1c2,0,3.8,0.3,5.6,0.9c1.8,0.6,3.3,1.6,4.6,2.9
                  l-0.5,0.6c-1.4-1.3-2.9-2.2-4.5-2.8c-1.6-0.5-3.3-0.8-5.2-0.8c-2,0-3.9,0.4-5.7,1.1c-1.8,0.7-3.3,1.7-4.6,3
                  c-1.3,1.3-2.3,2.8-3,4.5c-0.7,1.7-1.1,3.6-1.1,5.6c0,2,0.4,3.9,1.1,5.6c0.7,1.7,1.7,3.2,3,4.5c1.3,1.3,2.8,2.3,4.6,3
                  c1.8,0.7,3.7,1.1,5.7,1.1c1.8,0,3.5-0.3,5.2-0.8c1.6-0.6,3.1-1.5,4.5-2.8l0.5,0.6c-1.3,1.3-2.8,2.2-4.6,2.9
                  C597.4,258.2,595.5,258.5,593.6,258.5z"/>
                <path className="st5" d="M635.8,258.4v-29h-11.1v-0.8h23v0.8h-11.1v29H635.8z"/>
                <path className="st5" d="M672.5,258.4v-29.8h0.9v29.8H672.5z"/>
                <path className="st5" d="M711.8,258.4l-13.4-29.8h1l13.1,29.1H712l13.1-29.1h1l-13.4,29.8H711.8z"/>
                <path className="st5" d="M763.2,258.5c-2.2,0-4.2-0.4-6.1-1.1c-1.9-0.8-3.5-1.8-4.9-3.2c-1.4-1.4-2.4-3-3.2-4.8s-1.2-3.8-1.2-6
                  s0.4-4.1,1.2-6s1.8-3.4,3.2-4.8c1.4-1.4,3-2.4,4.9-3.2c1.9-0.8,3.9-1.1,6.1-1.1c2.2,0,4.2,0.4,6.1,1.1
                  c1.9,0.8,3.5,1.8,4.9,3.2c1.4,1.4,2.4,3,3.2,4.8s1.2,3.8,1.2,6s-0.4,4.1-1.2,6s-1.8,3.4-3.2,4.8c-1.4,1.4-3,2.4-4.9,3.2
                  C767.4,258.1,765.4,258.5,763.2,258.5z M763.2,257.7c2,0,3.9-0.4,5.7-1.1c1.8-0.7,3.3-1.7,4.6-3c1.3-1.3,2.3-2.8,3-4.5
                  c0.7-1.7,1.1-3.6,1.1-5.6s-0.4-3.9-1.1-5.6c-0.7-1.7-1.7-3.2-3-4.5s-2.8-2.3-4.6-3s-3.7-1.1-5.7-1.1c-2,0-3.9,0.4-5.7,1.1
                  s-3.3,1.7-4.6,3c-1.3,1.3-2.3,2.8-3,4.5c-0.7,1.7-1.1,3.6-1.1,5.6s0.4,3.9,1.1,5.6c0.7,1.7,1.7,3.2,3,4.5
                  c1.3,1.3,2.8,2.3,4.6,3C759.2,257.3,761.1,257.7,763.2,257.7z"/>
                <polygon className="st1" points="318.3,254.5 318.3,129.8 204,67.5 89.7,129.8 89.7,254.5 204,316.8"/>
                <line className="st7" x1="136" y1="131.2" x2="136" y2="202.3"/>
                <polygon className="st7" points="225.8,204.1 225.8,180.3 204,168.4 182.2,180.3 182.2,204.1 204,216"/>
                <line className="st8" x1="140.7" y1="276.2" x2="248" y2="217.8"/>
                <polygon className="st8" points="249.1,216.7 249.1,167.6 204,143 158.9,167.6 158.9,216.7 204,241.3"/>
                <path className="st7" d="M293.9,167.1c0,0-40.1-22.6-66.7-37.1"/>
                <line className="st7" x1="246" y1="95.4" x2="158.8" y2="142.7"/>
                <polyline className="st7" points="112.5,215.6 133.4,227.4 181.5,253.6"/>
                <polyline className="st7" points="183.1,278.1 204,266.3 250,240.9"/>
                <line className="st7" x1="272" y1="252" x2="272" y2="179.6"/>
                <line className="st9" x1="204" y1="93.3" x2="159.2" y2="117.7"/>
                <path className="st9" d="M113.3,144.2c0,0,0,23.4,0,48.2"/>
                <path className="st9" d="M113.3,241.3c7.9,4.3,37.8,20.9,47,25.9"/>
                <line className="st9" x1="204" y1="291.1" x2="246.3" y2="268"/>
                <path className="st9" d="M294.7,240.9c0-9.4,0-38,0-50"/>
                <line className="st9" x1="296.4" y1="143.9" x2="247.3" y2="116.8"/>
                <g>
                    <line className="st8" x1="268.4" y1="108.1" x2="204.4" y2="142.9"/>
                    <line className="st8" x1="311" y1="201.5" x2="249.6" y2="168"/>
                </g>
                <line className="st8" x1="249.1" y1="285.6" x2="249.1" y2="167.6"/>
                <line className="st8" x1="159" y1="215.8" x2="159" y2="97.8"/>
                <line className="st8" x1="95.3" y1="182" x2="163.3" y2="219"/>
            </g>
          </svg>
        </div>

        <p className="text-sm md:text-base font-mono mb-8 text-neutral-500 tracking-[0.2em] uppercase">Est. 2026 — Medellín, Colombia</p>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12 text-neutral-900">
          ARTE<span className="text-[#4C0299]">.</span><br/>
          CULTURA<span className="text-[#F8C300]">.</span><br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C0299] to-[#F8C300]">TECNOLOGÍA</span>
          <span className="text-[#4C0299]">.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-end justify-between border-t border-black pt-12">
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl text-neutral-800">
            <span className="font-bold">Núcleo Colectivo</span> es una plataforma viva. 
            Un laboratorio, archivo y vitrina que elimina intermediaciones para conectar la creación contemporánea con el mundo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button onClick={() => setView('obra')} className="bg-[#F8C300] text-black px-10 py-5 text-lg font-bold flex items-center justify-center gap-3 hover:bg-[#e0b000] transition-all group">
              Explorar Obra <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('radio')} className="border-2 border-[#4C0299] text-[#4C0299] px-10 py-5 text-lg font-bold hover:bg-[#4C0299] hover:text-white transition-all flex items-center justify-center gap-3 group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Radio Núcleo
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// --- NUCLEO VIEW (Restored) ---
const NucleoView = () => (
  <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
    <SectionTitle subtitle="Manifiesto y Estructura">NÚCLEO</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-7 space-y-8 text-lg md:text-xl font-light leading-relaxed text-neutral-800">
        <p>
          <strong className="text-black font-bold text-2xl block mb-2">El Origen.</strong> 
          En un ecosistema digital dominado por la fugacidad y el ruido, Núcleo Colectivo reclama un territorio propio. No somos una red social, somos una estructura estable y curada.
        </p>
        <p>
          Entendemos el arte como proceso, la educación como extensión de la obra y la tecnología como herramienta crítica, no como fin en sí mismo.
        </p>
        <div className="bg-neutral-100 p-6 rounded-lg border-l-4 border-[#F8C300] my-8">
           <h4 className="font-bold text-xl mb-2 text-[#4C0299]">Visión 2027</h4>
           <p className="text-lg italic text-neutral-700">
             "Ser el referente a nivel local y nacional (Medellín-Colombia) en el cruce de artes visuales, inteligencia artificial y pedagogía."
           </p>
        </div>
        <div className="h-px w-full bg-neutral-200 my-8"></div>
        <div className="grid grid-cols-2 gap-8">
           <div><h4 className="font-bold uppercase text-sm mb-2 text-neutral-500">Misión</h4><p className="text-base">Consolidar un archivo vivo que conecte procesos creativos con instituciones y audiencias globales.</p></div>
           <div><h4 className="font-bold uppercase text-sm mb-2 text-neutral-500">Visión 2027</h4><p className="text-base">Ser el referente a nivel local y nacional (Medellín-Colombia) en el cruce de artes visuales, inteligencia artificial y pedagogía.</p></div>
        </div>
      </div>
      <div className="md:col-span-5 bg-neutral-100 p-8 md:p-12 border-t-4 border-[#4C0299] shadow-sm h-fit">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Layers className="text-[#4C0299]"/> Ejes de Acción</h3>
        <ul className="space-y-6">
          <li className="group cursor-default"><span className="block text-xs font-bold uppercase text-neutral-400 mb-1 group-hover:text-[#4C0299] transition-colors">01. Vitrina</span><span className="text-lg font-medium">Presentación profesional de obra sin ruido.</span></li>
          <li className="group cursor-default"><span className="block text-xs font-bold uppercase text-neutral-400 mb-1 group-hover:text-[#4C0299] transition-colors">02. Laboratorio</span><span className="text-lg font-medium">Investigación en IA y nuevos medios.</span></li>
          <li className="group cursor-default"><span className="block text-xs font-bold uppercase text-neutral-400 mb-1 group-hover:text-[#4C0299] transition-colors">03. Archivo</span><span className="text-lg font-medium">Documentación de procesos y memoria.</span></li>
        </ul>
      </div>
    </div>
  </div>
);

// --- COMPONENTE: WORK VIEW ACTUALIZADO ---
const WorkView = ({ setView }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    if (project.isInteractive) {
        setView('vj');
    } else {
        setSelectedProject(project);
    }
  };

  return (
      <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
        <SectionTitle subtitle="Portafolio de Creación">OBRA</SectionTitle>
        <div className="space-y-20">
          {PROJECTS.map((project, index) => (
              <div key={project.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="w-full md:w-1/2">
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer" onClick={() => handleProjectClick(project)}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {project.isInteractive && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-[#00ff88] text-black font-bold font-mono px-6 py-3 uppercase tracking-widest shadow-lg transform scale-105">
                                Ejecutar Sistema
                            </span>
                        </div>
                      )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center gap-4"><span className="text-4xl font-black text-neutral-200">0{index+1}</span><div className="h-px bg-neutral-200 flex-grow"></div><span className="text-xs font-bold uppercase tracking-widest bg-black text-white px-2 py-1">{project.year}</span></div>
                    <h3 className="text-4xl font-bold leading-tight">{project.title}</h3>
                    <p className="text-lg text-neutral-600 line-clamp-3">{project.fullDescription}</p>
                    <div className="bg-neutral-50 p-6 border-l-4 border-[#4C0299]">
                      <h4 className="text-xs font-bold uppercase text-neutral-400 mb-3 flex items-center gap-2"><Cpu size={14}/> Especificaciones Técnicas</h4>
                      <div className="flex flex-wrap gap-2">{project.specs.map(spec => (<span key={spec} className="bg-white border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 rounded-md shadow-sm">{spec}</span>))}</div>
                    </div>
                    {project.isInteractive ? (
                        <button onClick={() => setView('vj')} className="flex items-center gap-2 text-sm font-bold text-[#00ff88] bg-black px-6 py-3 rounded uppercase tracking-wider cursor-pointer hover:bg-[#00ff88] hover:text-black transition-all">
                           <Activity size={18} /> EJECUTAR SISTEMA EN VIVO
                        </button>
                    ) : (
                        <button onClick={() => setSelectedProject(project)} className="flex items-center gap-2 text-sm font-bold text-[#4C0299] uppercase tracking-wider cursor-pointer group">
                          Ver Documentación Completa <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    )}
                </div>
              </div>
          ))}
        </div>
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
  );
};

// --- RADIO PAGE VIEW ACTUALIZADA (FULLSCREEN TOGGLE) ---
const RadioPageView = ({ currentStation, setCurrentStation, isPlaying, setIsPlaying, audioAnalyser }) => {
  const handleStationClick = (station) => { if (currentStation?.id === station.id) { setIsPlaying(!isPlaying); } else { setCurrentStation(station); setIsPlaying(true); } };
  return (
    <div className="bg-neutral-900 min-h-screen text-white pt-20 pb-40 px-6 md:px-12 animate-fade-in">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-800 pb-8"><div><h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 flex items-center gap-4">RADIO <span className="text-neutral-600">NÚCLEO</span><Signal className="text-red-500 animate-pulse hidden md:block" size={60} /></h1><p className="text-xl text-neutral-400 max-w-2xl font-light">Sintonizador global de frecuencias experimentales, comunitarias y culturales. Una curaduría viva de 100+ emisoras independientes.</p></div><div className="flex gap-4 mt-8 md:mt-0"><div className="bg-neutral-800 px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>ONLINE</div><div className="bg-neutral-800 px-4 py-2 rounded-full text-xs font-mono">V.2.0 BETA</div></div></div>
        {currentStation && (<div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 p-8 md:p-12 mb-16 rounded-xl relative overflow-hidden group min-h-[300px] flex items-center">
            {/* VISUALIZADOR CON FULLSCREEN HABILITADO */}
            <GravityMeshVisualizer embedded={true} audioAnalyser={audioAnalyser} showFullscreenToggle={true} />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center w-full pointer-events-none"><button onClick={() => setIsPlaying(!isPlaying)} className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] flex-shrink-0 pointer-events-auto">{isPlaying ? <Pause size={40} fill="black" /> : <Play size={40} fill="black" className="ml-2" />}</button><div><span className="text-red-500 font-bold tracking-widest text-xs mb-2 block animate-pulse">AHORA SONANDO</span><h2 className="text-4xl font-bold mb-2">{currentStation.title}</h2><p className="text-xl text-neutral-300 mb-4">{currentStation.description}</p><div className="flex gap-3"><span className="bg-black/30 px-3 py-1 text-sm font-mono text-neutral-400 border border-neutral-700">{currentStation.location}</span>{currentStation.tags.map(tag => (<span key={tag} className="bg-black/30 px-3 py-1 text-sm font-mono text-neutral-400 border border-neutral-700">{tag}</span>))}</div></div></div></div>)}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3 space-y-16">
              {STATIONS_DATA.map((category, idx) => (
                <div key={idx}><h3 className="text-2xl font-bold mb-8 border-l-4 border-white pl-4 uppercase tracking-wider">{category.category}</h3><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{category.stations.map((station) => (<div key={station.id} onClick={() => handleStationClick(station)} className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 group hover:-translate-y-1 ${currentStation?.id === station.id ? 'bg-white text-black border-white' : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800'}`}><div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-full ${currentStation?.id === station.id ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-400 group-hover:text-white'}`}>{currentStation?.id === station.id && isPlaying ? <Volume2 size={20} className="animate-pulse"/> : <Play size={20} className="ml-1"/>}</div><span className={`text-xs font-mono uppercase ${currentStation?.id === station.id ? 'text-neutral-500' : 'text-neutral-500'}`}>{station.location}</span></div><h4 className="text-xl font-bold mb-2">{station.title}</h4><p className={`text-sm mb-4 line-clamp-2 ${currentStation?.id === station.id ? 'text-neutral-600' : 'text-neutral-400'}`}>{station.description}</p><div className="flex flex-wrap gap-2">{station.tags.map(tag => (<span key={tag} className={`text-[10px] uppercase px-2 py-0.5 rounded border ${currentStation?.id === station.id ? 'border-neutral-300 text-neutral-500' : 'border-neutral-700 text-neutral-500'}`}>{tag}</span>))}</div></div>))}</div></div>
              ))}
            </div>
            {/* RADIO SCHEDULE */}
            <div className="lg:col-span-1">
                <div className="bg-neutral-800 p-6 rounded-xl sticky top-24">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-sm border-b border-neutral-700 pb-4"><Calendar size={16}/> Programación Vivo</h3>
                    <div className="space-y-6">
                        {[{time: '08:00', show: 'Mañanas de Niebla', host: 'Ambient & Drone'}, {time: '14:00', show: 'Latitudes', host: 'Sonidos del Sur'}, {time: '18:00', show: 'Algorave Sessions', host: 'Live Coding'}, {time: '22:00', show: 'Nocturno', host: 'Experimental'}].map((slot, i) => (
                            <div key={i} className="flex gap-4 group cursor-default">
                                <span className="font-mono text-[#F8C300] text-sm pt-1">{slot.time}</span>
                                <div><h4 className="font-bold text-sm group-hover:text-[#F8C300] transition-colors">{slot.show}</h4><p className="text-xs text-neutral-500">{slot.host}</p></div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-neutral-700"><button className="w-full text-xs font-mono uppercase text-neutral-400 hover:text-white flex justify-between items-center">Ver parrilla completa <ArrowRight size={12}/></button></div>
                </div>
            </div>
        </div>
        <div className="p-12 bg-neutral-800 rounded-2xl text-center border border-neutral-700"><h3 className="text-3xl font-bold mb-4">¿Tienes una radio experimental?</h3><p className="text-neutral-400 mb-8 max-w-2xl mx-auto">Estamos construyendo el directorio más completo de frecuencias independientes de Latinoamérica y el mundo. Súmate al archivo vivo de Núcleo Colectivo.</p><button className="bg-white text-black px-8 py-3 font-bold hover:bg-neutral-200 transition-colors">Sugerir Emisora</button></div>
      </div>
    </div>
  );
};

// --- TALLERES Y COTIZADOR VIEW (Restored) ---
const WorkshopsView = () => {
  const [taller, setTaller] = useState('ia_creativa');
  const [hours, setHours] = useState(9);
  const [participants, setParticipants] = useState(1);
  const [modality, setModality] = useState("virtual");
  const [city, setCity] = useState("Medellín");
  const [priceResult, setPriceResult] = useState({ min: 0, max: 0, isRange: false });
  const Share2 = ({size, className}) => <Network size={size} className={className} />;
  const WORKSHOPS = [
    { id: 'ia_creativa', title: "IA para Procesos Creativos", level: "Introductorio", desc: "Domina herramientas generativas para expandir tu flujo de trabajo artístico.", icon: BrainCircuit },
    { id: 'narrativas', title: "Narrativas Transmedia", level: "Abierto", desc: "Diseño de universos que cruzan lo físico, lo digital y lo sonoro.", icon: Share2 },
    { id: 'sonido', title: "Diseño Sonoro & Síntesis", level: "Avanzado", desc: "Creación de paisajes sonoros y texturas para medios audiovisuales.", icon: Disc },
    { id: 'vj', title: "Visualización de Datos (VJ)", level: "Intermedio", desc: "Creación de visuales reactivos al audio en tiempo real.", icon: Activity },
    { id: 'colectiva', title: "Creación Colectiva con IA", level: "Intermedio", desc: "Metodologías participativas y prototipado rápido en grupo.", icon: Users },
  ];
  const isInstitutional = useMemo(() => {
    return (participants >= 26 || hours >= 24 || (modality === "presencial" && hours >= 8 && city.toLowerCase() !== "medellín" && city.toLowerCase() !== "medellin"));
  }, [participants, hours, modality, city]);
  useEffect(() => {
    if (isInstitutional) {
        if (hours >= 24) setPriceResult({ min: 10000000, max: 14000000, isRange: true });
        else if (hours >= 16) setPriceResult({ min: 7000000, max: 9000000, isRange: true });
        else if (hours >= 8) setPriceResult({ min: 4000000, max: 5500000, isRange: true });
        else setPriceResult({ min: 2500000, max: 3500000, isRange: true });
    } else {
        let hourlyRate;
        if (participants === 1) hourlyRate = 145000;
        else if (participants <= 5) hourlyRate = 180000;
        else if (participants <= 15) hourlyRate = 220000;
        else hourlyRate = 250000; 
        let logisticFee = (modality === 'presencial' && city.toLowerCase() !== 'medellin') ? 300000 : 0;
        let total = (hourlyRate * hours) + logisticFee;
        let minTotal = Math.round(total * 0.9 / 10000) * 10000;
        let maxTotal = Math.round(total * 1.1 / 10000) * 10000;
        setPriceResult({ min: minTotal, max: maxTotal, isRange: true });
    }
  }, [isInstitutional, hours, participants, modality, city]);
  const whatsappMessage = useMemo(() => {
    if (isInstitutional) { return `Hola Núcleo Colectivo, realicé una cotización para un programa institucional de ${hours} horas para ${participants} personas en ${city}. Me gustaría recibir una propuesta formal ajustada a nuestro contexto.`; }
    const tallerName = WORKSHOPS.find(w => w.id === taller)?.title || "Taller";
    return `Hola, hice una cotización para el taller "${tallerName}" (${hours}h, ${participants} pax, ${modality}). El estimado fue entre $${priceResult.min.toLocaleString()} y $${priceResult.max.toLocaleString()}. Quisiera agendar o ajustar detalles.`;
  }, [isInstitutional, hours, participants, city, modality, taller, priceResult]);

  return (
    <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
      <SectionTitle subtitle="Formación y Experimentación">TALLERES</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-xl text-neutral-600 mb-10 leading-relaxed">Nuestros procesos formativos no son clases tradicionales. Son <span className="font-bold text-[#4C0299]">laboratorios de creación</span> donde la teoría se disuelve en la práctica. Aprender haciendo, hackeando y colaborando.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">{WORKSHOPS.map((ws) => (<div key={ws.id} onClick={() => setTaller(ws.id)} className={`border p-6 cursor-pointer transition-all group bg-white relative overflow-hidden ${taller === ws.id ? 'border-[#F8C300] ring-2 ring-[#F8C300]/20 shadow-lg' : 'border-neutral-200 hover:border-[#F8C300] hover:shadow-md'}`}><div className="flex justify-between items-start mb-4 relative z-10"><div className={`p-3 rounded-full transition-colors ${taller === ws.id ? 'bg-[#F8C300] text-black' : 'bg-neutral-100 group-hover:bg-[#F8C300] group-hover:text-black'}`}><ws.icon size={24} /></div><span className="text-[10px] font-mono uppercase bg-black text-white px-2 py-1 rounded">{ws.level}</span></div><h3 className="text-lg font-bold mb-2 relative z-10">{ws.title}</h3><p className="text-sm text-neutral-500 mb-4 relative z-10">{ws.desc}</p><div className="text-[#4C0299] text-xs font-bold uppercase tracking-widest flex items-center gap-2 relative z-10">{taller === ws.id ? <span className="flex items-center gap-2"><Check size={14}/> Seleccionado</span> : 'Seleccionar'}</div></div>))}</div>
        </div>
        <div className={`p-8 md:p-12 rounded-2xl border relative overflow-hidden transition-all duration-500 ${isInstitutional ? 'bg-gradient-to-br from-[#4C0299] to-[#2E015C] text-white border-[#4C0299]' : 'bg-neutral-50 border-neutral-200 text-neutral-900'}`}>
           <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-colors duration-500 ${isInstitutional ? 'bg-[#F8C300] opacity-20' : 'bg-[#F8C300] opacity-10'}`}></div>
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-8"><div className={`p-3 rounded-lg ${isInstitutional ? 'bg-white/10' : 'bg-white shadow-sm'}`}><Calculator className={isInstitutional ? "text-[#F8C300]" : "text-[#4C0299]"} size={32} /></div><div><h3 className="text-2xl font-bold">Cotizador Inteligente</h3><p className={`text-sm ${isInstitutional ? 'text-white/70' : 'text-neutral-500'}`}>{isInstitutional ? "Detección de Programa Institucional" : "Estima la inversión para tu proyecto."}</p></div></div>
             <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className={`block text-xs font-bold uppercase mb-3 flex items-center gap-2 ${isInstitutional ? 'text-white/60' : 'text-neutral-400'}`}><Clock size={14}/> Duración Total</label><input type="range" min="2" max="40" step="1" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isInstitutional ? 'bg-white/20 accent-[#F8C300]' : 'bg-neutral-200 accent-[#4C0299]'}`} /><div className="flex justify-between mt-2 font-mono text-sm"><span>{hours} Horas</span><span className="opacity-50 text-xs">{(hours/8).toFixed(1)} Días aprox.</span></div></div><div><label className={`block text-xs font-bold uppercase mb-3 flex items-center gap-2 ${isInstitutional ? 'text-white/60' : 'text-neutral-400'}`}><Users size={14}/> Participantes</label><input type="range" min="1" max="50" value={participants} onChange={(e) => setParticipants(parseInt(e.target.value))} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isInstitutional ? 'bg-white/20 accent-[#F8C300]' : 'bg-neutral-200 accent-[#4C0299]'}`} /><div className="text-right font-mono text-sm mt-2">{participants} Personas</div></div></div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className={`block text-xs font-bold uppercase mb-2 ${isInstitutional ? 'text-white/60' : 'text-neutral-400'}`}>Modalidad</label><div className="flex bg-black/5 rounded-lg p-1">{['virtual', 'presencial'].map(m => (<button key={m} onClick={() => setModality(m)} className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${modality === m ? (isInstitutional ? 'bg-white text-[#4C0299]' : 'bg-white shadow text-black') : 'text-opacity-50'}`}>{m}</button>))}</div></div>{modality === 'presencial' && (<div className="animate-fade-in"><label className={`block text-xs font-bold uppercase mb-2 ${isInstitutional ? 'text-white/60' : 'text-neutral-400'}`}>Ciudad</label><div className="relative"><MapPin size={16} className={`absolute left-3 top-3 ${isInstitutional ? 'text-white/50' : 'text-neutral-400'}`}/><input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none ${isInstitutional ? 'bg-white/10 border border-white/20 text-white placeholder-white/30' : 'bg-white border border-neutral-200 text-black'}`} /></div></div>)}</div>
               <div className={`mt-8 pt-8 border-t ${isInstitutional ? 'border-white/20' : 'border-neutral-200'}`}>
                 {isInstitutional ? (<div className="animate-fade-in"><div className="flex items-start gap-3 mb-4 bg-[#F8C300]/20 p-4 rounded-lg border border-[#F8C300]/50"><ShieldCheck className="text-[#F8C300] flex-shrink-0" /><div><h4 className="font-bold text-[#F8C300] text-sm uppercase mb-1">Programa Institucional Detectado</h4><p className="text-xs text-white/80 leading-relaxed">Por la duración y el tamaño del grupo, este proceso requiere un diseño pedagógico y logístico a medida.</p></div></div><div className="flex justify-between items-end mb-2"><span className="text-sm font-bold text-white/60 uppercase">Rango Estimado</span><div className="text-right"><span className="text-3xl font-black text-white tracking-tighter block">${(priceResult.min/1000000).toFixed(1)}M - ${(priceResult.max/1000000).toFixed(1)}M</span><span className="text-[10px] text-[#F8C300] font-mono">COP + IVA</span></div></div></div>) : (<div className="animate-fade-in"><div className="flex justify-between items-end mb-2"><span className="text-sm font-bold text-neutral-500 uppercase">Inversión Estimada</span><div className="text-right"><span className="text-4xl font-black text-[#4C0299] tracking-tighter block">${priceResult.min.toLocaleString('es-CO')} - ${priceResult.max.toLocaleString('es-CO')}</span><span className="text-[10px] text-neutral-400 font-mono">COP</span></div></div><p className="text-[10px] text-neutral-400 mb-6 text-right">*Valores de referencia. Sujeto a disponibilidad.</p></div>)}
                 <a href={`https://wa.me/573006101221?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className={`w-full py-4 font-bold rounded-lg transition-all flex justify-center items-center gap-2 uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isInstitutional ? 'bg-white text-[#4C0299] hover:bg-[#F8C300] hover:text-black' : 'bg-[#F8C300] text-black hover:bg-black hover:text-white'}`}>{isInstitutional ? "Solicitar Propuesta Formal" : "Continuar por WhatsApp"} <MessageCircle size={18} /></a>
                 <p className={`text-[10px] text-center mt-4 ${isInstitutional ? 'text-white/40' : 'text-neutral-400'}`}>Algunos formatos requieren diseño pedagógico y logístico específico.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MEMBERS VIEW (Restored) ---
const MembersView = () => (
  <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
    <SectionTitle subtitle="Artistas y Colaboradores">MIEMBROS</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{MEMBERS.map(member => (<div key={member.id} className="group"><div className="overflow-hidden mb-4 rounded-lg bg-gray-100"><img src={member.image} alt={member.name} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" /></div><h3 className="text-xl font-bold">{member.name}</h3><p className="text-sm text-neutral-500 font-mono mb-2 uppercase">{member.role}</p><p className="text-neutral-600 mb-4 line-clamp-3">{member.bio}</p><div className="flex gap-2 mb-4">{member.social.instagram && <MultiInstagramButton urls={member.social.instagram} />}{member.social.website && <SocialButton icon={Globe} url={member.social.website} label="Web" />}{member.social.tiktok && <SocialButton icon={Video} url={member.social.tiktok} label="TikTok" />}</div><div className="flex flex-wrap gap-2">{member.tags.map(tag => (<span key={tag} className="text-[10px] border border-neutral-200 px-2 py-1 rounded-full text-neutral-400 uppercase">{tag}</span>))}</div></div>))}</div>
  </div>
);

// --- SPECIAL PROJECTS VIEW (Restored) ---
const SpecialProjectsView = () => (
  <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
    <SectionTitle subtitle="Iniciativas Especiales">PROYECTOS</SectionTitle>
    <div className="grid grid-cols-1 gap-12">{SPECIAL_PROJECTS.map(project => (<div key={project.id} className="bg-neutral-900 text-white rounded-2xl overflow-hidden relative min-h-[400px] flex items-center"><div className={`absolute top-0 right-0 w-full h-full opacity-20 bg-gradient-to-l from-[#F8C300] to-transparent`}></div><div className="relative z-10 p-12 md:p-20 max-w-3xl"><span className="text-[#F8C300] font-mono text-sm uppercase tracking-widest mb-2 block">{project.subtitle}</span><h3 className="text-5xl md:text-7xl font-black mb-6">{project.title}</h3><p className="text-xl md:text-2xl text-neutral-300 font-light mb-8">{project.description}</p><button className="bg-white text-black px-8 py-3 font-bold hover:bg-[#F8C300] transition-colors">Explorar Universo</button></div></div>))}</div>
  </div>
);

// --- CONTACT VIEW (Restored) ---
const ContactView = () => (
  <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto animate-fade-in">
    <SectionTitle subtitle="Conecta con nosotros">CONTACTO</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8"><p className="text-xl leading-relaxed text-neutral-600">¿Tienes una propuesta, proyecto o simplemente quieres saludar? Estamos siempre abiertos a nuevas conexiones y colaboraciones.</p><div className="space-y-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-black"><Mail size={20}/></div><div><h4 className="font-bold text-sm uppercase text-neutral-500">Email</h4><a href="mailto:hola@nucleocolectivo.com" className="text-lg font-medium hover:text-[#4C0299] transition-colors">hola@nucleocolectivo.com</a></div></div><div className="flex items-center gap-4"><div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-black"><MapPin size={20}/></div><div><h4 className="font-bold text-sm uppercase text-neutral-500">Ubicación</h4><p className="text-lg font-medium">Medellín, Colombia</p></div></div></div><div className="pt-8 border-t border-neutral-200"><h4 className="font-bold mb-4">Síguenos</h4><div className="flex gap-4"><SocialButton icon={Instagram} url="https://www.instagram.com/nucleo_colectivo_art/" label="Instagram" /><SocialButton icon={Video} url="https://www.tiktok.com/@ncleo.colectivo" label="TikTok" /></div></div></div>
        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200"><form className="space-y-6" onSubmit={(e) => e.preventDefault()}><div><label className="block text-xs font-bold uppercase text-neutral-500 mb-2">Nombre</label><input type="text" className="w-full p-3 bg-white border border-neutral-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="Tu nombre" /></div><div><label className="block text-xs font-bold uppercase text-neutral-500 mb-2">Email</label><input type="email" className="w-full p-3 bg-white border border-neutral-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="tucorreo@ejemplo.com" /></div><div><label className="block text-xs font-bold uppercase text-neutral-500 mb-2">Mensaje</label><textarea rows="4" className="w-full p-3 bg-white border border-neutral-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="¿En qué podemos colaborar?"></textarea></div><button className="w-full bg-black text-white py-4 font-bold rounded-lg hover:bg-[#4C0299] transition-colors flex items-center justify-center gap-2">Enviar Mensaje <ArrowRight size={18}/></button></form></div>
    </div>
  </div>
);

// --- CHALLENGE VIEW (Restored) ---
const ChallengeView = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const perfiles = {
        'artista': { mensaje: 'Sabemos que tu visión única y tu dominio del arte digital son claves para inspirar a una nueva generación. Tu participación es fundamental para conectar el alma creativa de la ciudad con las herramientas del futuro.', mision: 'Queremos que nos ayudes a definir el componente estético y conceptual de los proyectos, siendo mentora y guía para los talentos emergentes que buscan fusionar arte y código. Tu experiencia será el faro que ilumine nuestra misión cultural y social.', imagen: 'https://images.unsplash.com/photo-1617953141905-d2c71a182b3e?q=80&w=1932&auto=format&fit=crop', beneficios: [{ icon: Paintbrush, title: 'Espacio para Experimentar', text: 'Accede a recursos tecnológicos para llevar tus obras a un nuevo nivel y experimentar sin límites.' }, { icon: Users, title: 'Curaduría y Exhibición', text: 'Lidera y participa en exposiciones de alto impacto que mostrarán tu trabajo y el de nuevos talentos.' }, { icon: Lightbulb, title: 'Legado Creativo', text: 'Inspira y forma a la próxima ola de artistas digitales de Medellín, dejando una huella duradera.' }] },
        'academica': { mensaje: 'Tu rigurosidad académica y tu profundo conocimiento en innovación social son esenciales para dar estructura y propósito a nuestra misión. Tu colaboración garantizará que nuestro impacto sea medible, sostenible y verdaderamente transformador.', mision: 'Te invitamos a liderar la estrategia de investigación y desarrollo comunitario del proyecto, conectando la academia con las necesidades reales del territorio y midiendo el impacto de nuestras intervenciones.', imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', beneficios: [{ icon: BookOpen, title: 'Publicaciones y Casos de Estudio', text: 'Genera conocimiento y publica investigaciones sobre la intersección de arte, tecnología y sociedad.' }, { icon: GraduationCap, title: 'Conexión con Talento Joven', text: 'Vincula a tus estudiantes a proyectos reales y fomenta la investigación aplicada desde el aula.' }, { icon: FileText, title: 'Validación Metodológica', text: 'Diseña y aplica metodologías de innovación social que se conviertan en un referente para la ciudad.' }] },
        'emprendedor': { mensaje: 'Tu visión de negocio y tu habilidad para encontrar oportunidades en la intersección de tecnología y cultura son clave. Con tu colaboración, podemos crear un modelo sostenible que transforme el ecosistema creativo de Medellín.', mision: 'Te invitamos a ser un aliado estratégico en el desarrollo de nuevos modelos de negocio y la validación de prototipos, aportando tu perspectiva para escalar proyectos con impacto cultural y social.', imagen: 'https://images.unsplash.com/photo-1520607162513-77260239c877?q=80&w=2070&auto=format&fit=crop', beneficios: [{ icon: TrendingUp, title: 'Nuevos Modelos de Negocio', text: 'Aplica tu conocimiento para crear prototipos de negocio que demuestren la rentabilidad de la innovación cultural.' }, { icon: ShieldCheck, title: 'Validación de Proyectos', text: 'Participa en la validación de ideas y la incubación de startups que emergen de nuestro laboratorio.' }, { icon: Users, title: 'Red de Mentores', text: 'Accede a nuestra red de expertos y conecta con otros emprendedores del sector creativo y tecnológico.' }] }
    };
    const handleStart = () => { if (!name.trim() || !profile) { setErrorMsg('Por favor, ingresa tu nombre y selecciona un perfil.'); return; } setErrorMsg(''); setPageIndex(2); };
    const NavButtons = () => { if (pageIndex <= 1 || pageIndex === 11) return null; return (<div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center sticky bottom-4 z-50 pointer-events-auto"><button onClick={() => setPageIndex(pageIndex - 1)} className="flex items-center gap-2 font-mono text-[#F8C300] border border-[#F8C300] rounded-full px-6 py-3 bg-gray-900/80 hover:bg-[#F8C300] hover:text-gray-900 transition-colors"><ArrowRight className="rotate-180" size={18} /> Anterior</button><div className="flex gap-2">{Array.from({ length: 9 }).map((_, i) => (<div key={i} onClick={() => setPageIndex(i + 2)} className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${pageIndex === i + 2 ? 'bg-[#F8C300]' : 'bg-gray-600 hover:bg-gray-500'}`} />))}</div>{pageIndex < 10 ? (<button onClick={() => setPageIndex(pageIndex + 1)} className="flex items-center gap-2 font-mono text-[#F8C300] border border-[#F8C300] rounded-full px-6 py-3 bg-gray-900/80 hover:bg-[#F8C300] hover:text-gray-900 transition-colors">Siguiente <ArrowRight size={18} /></button>) : <div />}</div>); };
    return (
        <div className="font-sans bg-gray-900 text-gray-200 min-h-screen flex flex-col pt-20">
             <style>{`.font-display { font-family: 'Space Mono', monospace; } .text-accent { color: #F8C300; } .bg-accent { background-color: #F8C300; } .border-accent { border-color: #F8C300; } .glass-effect { background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(248, 195, 0, 0.2); } .btn-primary { display: inline-block; padding: 1rem 2rem; font-size: 1.125rem; font-weight: 700; color: #111827; background-color: #F8C300; border-radius: 0.5rem; transition: transform 0.3s ease, box-shadow 0.3s ease; } .btn-primary:hover { transform: scale(1.05); box-shadow: 0 10px 15px -3px rgba(248, 195, 0, 0.5); }`}</style>
            <div className="flex-grow flex flex-col justify-center container mx-auto p-4 md:p-8 animate-fade-in">
                {pageIndex === 0 && (<section className="min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden rounded-2xl"><div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Fondo" /></div><div className="relative z-10 max-w-5xl px-6"><h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-wide"><span className="block text-white mb-2">RETO</span><span className="block text-[#F8C300]">NÚCLEO COLECTIVO</span></h1><p className="text-gray-400 text-xl font-display mb-12 max-w-2xl mx-auto">La convergencia entre arte, tecnología y ciudad comienza aquí.</p><button onClick={() => setPageIndex(1)} className="btn-primary text-xl px-12 py-5 uppercase tracking-wider">Iniciar Experiencia</button></div></section>)}
                {pageIndex === 1 && (<section className="min-h-[70vh] flex flex-col items-center justify-center text-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-accent font-display">Personaliza la Experiencia</h2><div className="glass-effect p-8 rounded-2xl max-w-lg w-full"><p className="text-gray-300 mb-6">Ingresa tu nombre y selecciona tu perfil para ver un mensaje personalizado.</p><div className="mb-4 text-left"><label className="block text-gray-400 mb-2">Tu Nombre:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Diana" className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-accent" /></div><div className="mb-6 text-left"><label className="block text-gray-400 mb-2">Tu Perfil:</label><select value={profile} onChange={(e) => setProfile(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-accent"><option value="">Selecciona un perfil...</option><option value="artista">Artista o Creativo</option><option value="academica">Académico o Investigador</option><option value="emprendedor">Emprendedor o Tecnólogo</option></select></div>{errorMsg && <p className="text-red-400 text-sm mb-4">{errorMsg}</p>}<button onClick={handleStart} className="btn-primary w-full">Comenzar Misión</button></div></section>)}
                {pageIndex === 2 && (<header className="relative min-h-[60vh] flex items-center justify-center text-center rounded-2xl overflow-hidden p-6"><div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('${perfiles[profile]?.imagen || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop' }')` }}><div className="absolute inset-0 bg-gray-900 opacity-70"></div></div><div className="relative z-10 max-w-4xl"><h1 className="text-4xl md:text-7xl font-bold mb-4 text-accent font-display">Hola, {name}</h1><p className="text-xl md:text-2xl text-gray-200">Hemos preparado esta misión especialmente para ti.<br/>Transforma Medellín con nosotros.</p></div></header>)}
                {pageIndex === 3 && (<section className="min-h-[70vh] flex flex-col items-center justify-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-accent font-display">¿Qué es Reto Núcleo Colectivo?</h2><p className="max-w-4xl text-center text-lg text-gray-300 mb-12">Es una red de nodos interconectados que integra la ciudad. Un ecosistema donde cada espacio cultural, académico y tecnológico se convierte en un punto de conexión para la creatividad y la innovación.</p><div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">{[{ icon: Beaker, title: "Laboratorio Abierto", text: "Espacio para la experimentación, aprendizaje práctico y co-creación con IA." }, { icon: Store, title: "Vitrina Permanente", text: "Plataforma de exhibición continua para visibilizar proyectos." }, { icon: Network, title: "Comunidad Interconectada", text: "Punto de encuentro interdisciplinario para la colaboración." }].map((item, i) => (<div key={i} className="p-6 rounded-2xl glass-effect text-center hover:border-accent transition-all duration-300 border border-transparent"><div className="flex justify-center mb-4"><item.icon className="w-12 h-12 text-accent" /></div><h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3><p className="text-gray-400">{item.text}</p></div>))}</div></section>)}
                {pageIndex === 4 && (<section className="min-h-[70vh] flex items-center justify-center"><div className="max-w-5xl mx-auto p-8 rounded-2xl glass-effect"><h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-accent font-display">En Síntesis</h2>{profile && (<div className="p-4 border-l-4 border-accent bg-gray-800 rounded-r-lg mb-6"><p className="text-lg text-gray-300 italic">"{perfiles[profile].mensaje}"</p></div>)}<p className="text-lg text-gray-300 leading-relaxed text-justify"><strong>Núcleo Colectivo | Nodo360</strong> es un espacio físico y digital de innovación donde convergen arte, ciencia y tecnología, potenciados por inteligencia artificial. Funciona como un <strong>laboratorio abierto y vitrina permanente</strong>, fomentando la experimentación, la colaboración y la conexión de ideas.</p></div></section>)}
                {pageIndex === 5 && (<section className="min-h-[70vh] flex flex-col items-center justify-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent font-display">Nuestro Enfoque</h2><div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">{[{ icon: Lightbulb, title: "Aprendizaje Práctico", text: "Aprender haciendo. Experimentación directa donde el error es parte del proceso." }, { icon: Users, title: "Colaboración Radical", text: "Rompemos los silos. Encuentros improbables entre disciplinas." }, { icon: Activity, title: "Impacto Real", text: "Proyectos con aplicación tangible cultural, social o económica." }].map((item, i) => (<div key={i} className="p-6 rounded-2xl glass-effect text-center border border-transparent hover:border-accent transition-all"><div className="flex justify-center mb-4"><item.icon className="w-12 h-12 text-accent" /></div><h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3><p className="text-gray-400">{item.text}</p></div>))}</div></section>)}
                {pageIndex === 6 && (<section className="min-h-[70vh] flex flex-col items-center justify-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent font-display">¿A Quién Buscamos?</h2><div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">{[{ icon: Paintbrush, title: "Artistas y Creativos", text: "Mentes curiosas explorando la IA como nuevo lienzo." }, { icon: GraduationCap, title: "Académicos", text: "Expertos buscando un laboratorio vivo para aplicar conocimientos." }, { icon: Rocket, title: "Emprendedores", text: "Visionarios conectando tecnología con cultura." }].map((item, i) => (<div key={i} className="p-6 rounded-2xl glass-effect text-center border border-transparent hover:border-accent transition-all"><div className="flex justify-center mb-4"><item.icon className="w-12 h-12 text-accent" /></div><h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3><p className="text-gray-400">{item.text}</p></div>))}</div></section>)}
                {pageIndex === 7 && (<section className="text-center min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 py-16 px-6 rounded-2xl"><h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent font-display">Acepta la Misión</h2><p className="max-w-3xl mx-auto text-lg mb-8 text-gray-300">{profile ? perfiles[profile].mision : "Tu misión es unirte a nosotros para co-crear un ecosistema sin precedentes."}</p><button onClick={() => setPageIndex(8)} className="btn-primary">Aceptar Misión</button></section>)}
                {pageIndex === 8 && profile && (<section className="min-h-[70vh] flex flex-col items-center justify-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent font-display">Beneficios de la Colaboración</h2><div className="grid md:grid-cols-3 gap-8">{perfiles[profile].beneficios.map((b, i) => (<div key={i} className="p-6 rounded-2xl glass-effect text-center border border-accent"><div className="flex justify-center mb-4"><b.icon className="w-12 h-12 text-accent" /></div><h3 className="text-xl font-bold mb-2 font-display">{b.title}</h3><p className="text-gray-400">{b.text}</p></div>))}</div></section>)}
                {pageIndex === 9 && (<section className="min-h-[70vh] flex flex-col items-center justify-center"><h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent font-display">Nuestros Prototipos</h2><div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">{[{ icon: LayoutTemplate, title: "Plataforma V4.0", text: "Sitio principal.", link: "https://82hvn07yaf.space.minimax.io/" }, { icon: Radio, title: "NúcleoRadio", text: "Emisora experimental.", link: "https://jaekg09fdy.space.minimax.io/" }, { icon: BrainCircuit, title: "Portafolio IA", text: "Proyectos con IA.", link: "https://nucleocolectivo.github.io/PORTAFOLIO/#ia-projects" }, { icon: Layers, title: "Web Institucional", text: "Info corporativa.", link: "https://nucleocolectivo.github.io/WEB/" }, { icon: Rotate3d, title: "Revolución IA 360°", text: "Experiencia interactiva.", link: "https://q3dx839pz9.space.minimax.io/" }, { icon: Sparkles, title: "Creatividad Aumentada", text: "Nuevas narrativas.", link: "https://23ib1fo9tn.space.minimax.io/" }].map((p, i) => (<div key={i} className="p-6 rounded-2xl glass-effect flex flex-col justify-between hover:border-accent transition-all border border-transparent"><div><div className="flex items-center gap-4 mb-4"><p.icon className="w-8 h-8 text-accent" /><h3 className="text-lg font-bold font-display">{p.title}</h3></div><p className="text-gray-400 mb-6 text-sm">{p.text}</p></div><a href={p.link} target="_blank" rel="noreferrer" className="self-start text-accent border border-accent rounded-full px-4 py-2 text-xs font-bold hover:bg-accent hover:text-gray-900 transition-colors">Explorar</a></div>))}</div></section>)}
                {pageIndex === 10 && (<section className="text-center min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 py-16 px-6 rounded-2xl"><h2 className="text-3xl md:text-4xl font-bold mb-8 text-accent font-display">¡Únete a la Misión!</h2><p className="max-w-3xl mx-auto text-lg mb-8 text-gray-300">Estamos buscando aliados estratégicos. Queremos saber más de ti.</p><div className="flex flex-col sm:flex-row justify-center items-center gap-6"><a href="mailto:contacto@nucleocolectivo.com" className="flex items-center gap-2 text-accent border border-accent rounded-full px-6 py-3 hover:bg-accent hover:text-gray-900 transition-colors"><Mail size={20} /> Email</a><a href="https://wa.me/573006101221" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-accent border border-accent rounded-full px-6 py-3 hover:bg-accent hover:text-gray-900 transition-colors"><MessageCircle size={20} /> WhatsApp</a></div><button onClick={() => setPageIndex(11)} className="mt-12 text-gray-500 hover:text-white underline">Finalizar Recorrido</button></section>)}
                {pageIndex === 11 && (<section className="min-h-[70vh] flex flex-col items-center justify-center text-center"><h2 className="text-4xl md:text-6xl font-bold mb-4 text-accent font-display">¡Misión Cumplida!</h2><p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">Gracias por completar el recorrido, {name}. Tu interés nos impulsa a seguir construyendo el futuro.</p><Sparkles className="w-24 h-24 text-accent animate-pulse" /></section>)}
            </div>
            <NavButtons />
        </div>
    );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentStation, setCurrentStation] = useState(STATIONS_DATA[0].stations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [audioAnalyser, setAudioAnalyser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => { const handleScroll = () => { setScrolled(window.scrollY > 50); }; window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <HomeView setView={setActiveTab} />;
      case 'nucleo': return <NucleoView />;
      case 'talleres': return <WorkshopsView />; 
      case 'miembros': return <MembersView />;
      case 'obra': return <WorkView setView={setActiveTab} />; 
      case 'radio': return <RadioPageView currentStation={currentStation} setCurrentStation={setCurrentStation} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioAnalyser={audioAnalyser} />;
      case 'vj': return <GravityMeshVisualizer audioAnalyser={audioAnalyser} />;
      case 'proyectos': return <SpecialProjectsView />;
      case 'contacto': return <ContactView />;
      case 'reto': return <ChallengeView />; 
      default: return <HomeView setView={setActiveTab} />;
    }
  };

  const navLinks = [{ id: 'home', label: 'Home' }, { id: 'nucleo', label: 'Núcleo' }, { id: 'talleres', label: 'Talleres' }, { id: 'miembros', label: 'Miembros' }, { id: 'obra', label: 'Obra' }, { id: 'radio', label: 'Radio' }, { id: 'proyectos', label: 'Proyectos' }, { id: 'reto', label: 'Reto' }, { id: 'contacto', label: 'Contacto' }];
  const handleNavClick = (id) => { setActiveTab(id); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className={`font-sans text-neutral-900 bg-white min-h-screen selection:bg-black selection:text-white pb-16 md:pb-0 ${activeTab === 'radio' || activeTab === 'reto' || activeTab === 'vj' ? 'bg-neutral-900' : ''}`}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Space+Mono:wght@400;700&display=swap'); :root, body, .font-sans { font-family: 'Montserrat', sans-serif !important; } .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .animate-spin-slow { animation: spin 3s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; } .animate-fade-in { animation: fade-in-up 0.5s ease-out forwards; }`}</style>
      {activeTab !== 'reto' && activeTab !== 'vj' && (<header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-neutral-100' : 'bg-transparent py-8'} ${(activeTab === 'radio' && !scrolled) ? 'text-white' : ''}`}><div className="px-6 md:px-12 flex justify-between items-center max-w-[1600px] mx-auto"><button onClick={() => handleNavClick('home')} className="z-50 relative group"><span className={`text-2xl font-black tracking-tighter border-[3px] px-2 py-1 transition-colors ${(activeTab === 'radio' && !scrolled) ? 'border-white group-hover:bg-white group-hover:text-black' : 'border-black group-hover:bg-black group-hover:text-white'}`}>NÚCLEO</span></button><nav className="hidden xl:flex gap-8">{navLinks.map(link => (<button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-sm tracking-widest uppercase py-2 transition-all relative group ${activeTab === link.id ? 'font-bold' : ''} ${(activeTab === 'radio' && !scrolled) ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'}`}>{link.label}<span className={`absolute bottom-0 left-0 w-full h-[2px] transform transition-transform duration-300 origin-left ${activeTab === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'} ${(activeTab === 'radio' && !scrolled) ? 'bg-white' : 'bg-black'}`}></span></button>))}</nav><button className={`xl:hidden z-50 p-2 rounded-full ${(activeTab === 'radio' && !scrolled) ? 'text-white hover:bg-white/10' : 'text-black hover:bg-neutral-100'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button></div></header>)}
      {(activeTab === 'reto' || activeTab === 'vj') && (<button onClick={() => handleNavClick('home')} className={`fixed top-6 right-6 z-[100] border rounded-full px-4 py-2 hover:bg-opacity-20 transition-colors font-mono flex items-center gap-2 ${activeTab === 'vj' ? 'text-white border-white bg-black/20 hover:bg-white' : 'text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900'}`}><X size={18} /> Salir</button>)}
      <div className={`fixed inset-0 bg-white z-[55] transform transition-transform duration-500 cubic-bezier(0.7,0,0.3,1) xl:hidden flex flex-col justify-center items-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}><nav className="flex flex-col gap-8 text-center">{navLinks.map(link => (<button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-4xl font-black tracking-tighter uppercase ${activeTab === link.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-black to-neutral-600' : 'text-neutral-300 hover:text-black'} transition-colors`}>{link.label}</button>))}</nav></div>
      <main className="min-h-screen flex flex-col w-full">{renderContent()}</main>
      <div className={activeTab === 'reto' ? 'hidden' : 'block'}><RadioPlayer currentStation={currentStation} isPlaying={isPlaying} onTogglePlay={() => setIsPlaying(!isPlaying)} isExpanded={isPlayerExpanded} setIsExpanded={setIsPlayerExpanded} onAnalyserReady={setAudioAnalyser} /></div>
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {activeTab !== 'radio' && activeTab !== 'reto' && activeTab !== 'vj' && (
        <footer className="bg-black text-white px-6 md:px-12 py-12 md:py-20 mt-20 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="max-w-xs"><h2 className="text-2xl font-bold tracking-tighter mb-4">NÚCLEO COLECTIVO</h2><p className="text-neutral-400 text-sm leading-relaxed mb-6">Plataforma de arte, educación y tecnología. Un archivo vivo para la creación contemporánea.</p><div className="flex gap-4"><a href="https://www.instagram.com/nucleo_colectivo_art/" target="_blank" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors"><Instagram size={18} /></a><a href="mailto:hola@nucleocolectivo.com" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors"><Mail size={18} /></a><a href="https://www.tiktok.com/@ncleo.colectivo" target="_blank" className="w-10 h-10 border border-neutral-700 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-colors" aria-label="TikTok"><Video size={18} /></a></div></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 text-sm w-full md:w-auto">
              <div><h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">Explorar</h4><ul className="space-y-3"><li><button onClick={() => handleNavClick('obra')} className="hover:text-white text-neutral-400 transition-colors">Portafolio</button></li><li><button onClick={() => handleNavClick('miembros')} className="hover:text-white text-neutral-400 transition-colors">Artistas</button></li><li><button onClick={() => handleNavClick('radio')} className="hover:text-white text-neutral-400 transition-colors">Radio / Archivo</button></li></ul></div>
              <div><h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">Legal</h4><ul className="space-y-3"><li className="text-neutral-400 cursor-pointer hover:text-white">Privacidad</li><li className="text-neutral-400 cursor-pointer hover:text-white">Términos</li></ul></div>
              <div className="col-span-2 md:col-span-1"><h4 className="font-bold mb-4 uppercase text-neutral-500 tracking-widest text-xs">Acceso Miembros</h4><button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border border-neutral-800 px-4 py-2 rounded-sm text-xs uppercase font-bold"><Users size={14}/> Login</button></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500"><p>© 2026 Núcleo Colectivo. Todos los derechos reservados.</p><p className="mt-2 md:mt-0 font-mono tracking-widest">MEDELLÍN · ANTIOQUIA</p></div>
        </footer>
      )}
    </div>
  );
}
