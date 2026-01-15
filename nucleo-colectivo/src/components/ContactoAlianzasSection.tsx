export default function ContactoAlianzasSection() {
  return (
    <section id="contacto" className="min-h-screen py-20 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Contacto &{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Alianzas
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Claro, directo y funcional. Conectemos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-yellow-400 mb-6">Contacto Profesional</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Email General</h4>
                <a
                  href="mailto:nucleocolectivo.art@gmail.com"
                  className="text-purple-300 hover:text-purple-200 transition text-lg"
                >
                  nucleocolectivo.art@gmail.com
                </a>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Talleres y Educación</h4>
                <a
                  href="mailto:talleres@nucleocolectivo.art"
                  className="text-purple-300 hover:text-purple-200 transition text-lg"
                >
                  talleres@nucleocolectivo.art
                </a>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Proyectos y Colaboraciones</h4>
                <a
                  href="mailto:proyectos@nucleocolectivo.art"
                  className="text-purple-300 hover:text-purple-200 transition text-lg"
                >
                  proyectos@nucleocolectivo.art
                </a>
              </div>

              <div className="pt-4 border-t border-purple-500/30">
                <h4 className="text-white font-semibold mb-3">Síguenos</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center text-black transition-all transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <span className="text-2xl">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <span className="text-2xl">🐦</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center text-black transition-all transform hover:scale-110"
                    aria-label="YouTube"
                  >
                    <span className="text-2xl">🎥</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-purple-400 mb-6">Propuestas de Colaboración</h3>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Estamos abiertos a alianzas institucionales, proyectos culturales y colaboraciones creativas que compartan nuestra visión.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Instituciones Culturales</h4>
                  <p className="text-gray-400 text-sm">Talleres, residencias y proyectos colaborativos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Empresas e Innovación</h4>
                  <p className="text-gray-400 text-sm">Proyectos culturales y estrategias creativas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-black text-sm">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Artistas y Colectivos</h4>
                  <p className="text-gray-400 text-sm">Colaboraciones, intercambios y co-creación</p>
                </div>
              </div>
            </div>

            <a
              href="mailto:alianzas@nucleocolectivo.art"
              className="block text-center w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
            >
              Proponer Alianza
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            La web funciona como <span className="text-yellow-400">vendedor silencioso</span>
          </h3>
          <p className="text-gray-400 mb-6">
            Disponible 24/7 para consultas, encargos y colaboraciones.
          </p>
          <p className="text-purple-300 text-lg font-semibold">
            Respondemos en menos de 48 horas.
          </p>
        </div>
      </div>

      <footer className="mt-20 pt-12 border-t border-purple-500/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <img src="/logo-nucleo-colectivo.png" alt="Núcleo Colectivo" className="h-10 w-10" />
                <span className="text-white font-bold text-xl">Núcleo Colectivo</span>
              </div>
              <p className="text-gray-500 text-sm">
                Arte · Educación · Cultura · Tecnología
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm mb-2">
                Diseñado y desarrollado por Núcleo Colectivo
              </p>
              <p className="text-gray-600 text-xs">
                © 2026–2027 Todos los derechos reservados
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600 text-xs">
            <p>Creado con Manuel Palacio</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
