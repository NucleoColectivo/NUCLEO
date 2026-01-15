export default function NucleoSection() {
  return (
    <section id="nucleo" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950 to-black" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg-cosmic-digital.png')] bg-cover bg-center" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              El{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
                Núcleo
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Más que un colectivo. Un territorio propio.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">Origen y Contexto</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                En un ecosistema cultural saturado de redes sociales efímeras, Núcleo Colectivo se
                plantea como un <span className="text-white font-semibold">territorio propio</span>,
                estable y curado, donde el proyecto se narra con profundidad, contexto y visión de
                largo plazo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-purple-900/30 border border-yellow-500/30 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-purple-400 mb-4">Visión Artística</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Núcleo Colectivo no es un simple sitio informativo. Es una{' '}
                <span className="text-white font-semibold">plataforma viva</span>, pensada como
                vitrina, archivo, laboratorio y punto de encuentro.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Su función principal es{' '}
                <span className="text-yellow-400 font-semibold">mostrar para atraer</span>: exhibir
                obra, procesos, ideas y propuestas de manera clara, seductora y profesional.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">Principios Fundamentales</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎨</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Arte como Proceso</h4>
                  <p className="text-gray-400 text-sm">
                    La creación es un camino, no un destino
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Educación como Extensión</h4>
                  <p className="text-gray-400 text-sm">
                    Compartir conocimiento amplifica la obra
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">Tecnología como Herramienta</h4>
                  <p className="text-gray-400 text-sm">
                    La IA potencia, no reemplaza la creatividad
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400 text-lg mb-6">
                Esta sección construye <span className="text-white font-semibold">confianza</span>{' '}
                y <span className="text-purple-400 font-semibold">sentido</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#obra"
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
                >
                  Ver Nuestra Obra
                </a>
                <a
                  href="#educacion"
                  className="px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
                >
                  Explorar Talleres
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
