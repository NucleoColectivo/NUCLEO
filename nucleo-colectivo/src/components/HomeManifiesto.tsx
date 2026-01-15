import { useState, useEffect } from 'react';

const artBackgrounds = [
  '/backgrounds/bg-1.png',
  '/backgrounds/bg-2.png',
  '/backgrounds/bg-3.png',
  '/backgrounds/bg-4.png',
  '/backgrounds/bg-5.png',
  '/backgrounds/bg-6.png',
  '/backgrounds/bg-7.png',
  '/backgrounds/bg-8.png',
  '/backgrounds/bg-9.png',
  '/backgrounds/bg-10.png',
  '/backgrounds/bg-ar-reality.png',
  '/backgrounds/bg-biology-science.png',
  '/backgrounds/bg-cinema-film.png',
  '/backgrounds/bg-cosmic-digital.png',
  '/backgrounds/bg-cubism-paint.png',
  '/backgrounds/bg-dance-flow.png',
  '/backgrounds/bg-digital-symphony.png',
  '/backgrounds/bg-impressionism-paint.png',
  '/backgrounds/bg-lab-creative.png',
  '/backgrounds/bg-literature-words.png',
  '/backgrounds/bg-modernism-paint.png',
  '/backgrounds/bg-music-symphony.png',
  '/backgrounds/bg-neural-art.png',
  '/backgrounds/bg-pencil-paint.png',
  '/backgrounds/bg-photography-lens.png',
  '/backgrounds/bg-popart-paint.png',
  '/backgrounds/bg-sculpture-digital.png',
  '/backgrounds/bg-synesthesia-senses.png',
  '/backgrounds/bg-textile-weaving.png',
  '/backgrounds/bg-theater-drama.png',
  '/backgrounds/bg-watercolor-paint.png'
];

export default function HomeManifiesto() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % artBackgrounds.length);
        setNextBgIndex((prev) => (prev + 1) % artBackgrounds.length);
        setIsTransitioning(false);
      }, 1500);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-yellow-900/40" />

      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
            isTransitioning ? 'opacity-0' : 'opacity-30'
          }`}
          style={{ backgroundImage: `url(${artBackgrounds[currentBgIndex]})` }}
        />
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
            isTransitioning ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${artBackgrounds[nextBgIndex]})` }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block mb-8 px-6 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full">
          <span className="text-yellow-400 font-semibold tracking-wider">
            PLATAFORMA VIVA 2026—2027
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight">
          NÚCLEO
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
            COLECTIVO
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-purple-200 mb-12 font-light tracking-wide">
          Arte · Educación · Cultura · Tecnología · Humor
        </p>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            No somos un sitio informativo. Somos una{' '}
            <span className="text-yellow-400 font-semibold">plataforma viva</span>:
            vitrina, archivo, laboratorio y punto de contacto.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#miembros"
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50"
          >
            Conocer al Equipo
          </a>
          <a
            href="#nucleo"
            className="px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-bold rounded-lg text-lg transition-all transform hover:scale-105"
          >
            El Manifiesto
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 mb-2">∞</div>
            <p className="text-sm text-gray-400">Posibilidades</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-purple-400 mb-2">2</div>
            <p className="text-sm text-gray-400">Fundadores</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 mb-2">24/7</div>
            <p className="text-sm text-gray-400">Disponible</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-purple-400 mb-2">100%</div>
            <p className="text-sm text-gray-400">Contemporáneo</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#miembros" className="block text-yellow-400">
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
