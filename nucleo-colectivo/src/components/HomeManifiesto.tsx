export default function HomeManifiesto() {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-yellow-900" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/backgrounds/bg-neural-art.png')] bg-cover bg-center neural-flow" />
      </div>

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
