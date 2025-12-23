import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black">
        <header className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-500/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-nucleo-colectivo.png" alt="Núcleo Colectivo" className="h-12 w-12" />
              <span className="text-white font-bold text-2xl">Núcleo Colectivo</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#inicio" className="text-white hover:text-yellow-500 transition">Inicio</a>
              <a href="#contacto" className="text-white hover:text-yellow-500 transition">Contacto</a>
            </nav>
          </div>
        </header>

        <main>
          <section id="inicio" className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="text-center max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Núcleo Colectivo
              </h1>

              <p className="text-3xl md:text-4xl text-yellow-500 mb-8 font-semibold">
                Arte, Tecnología e Inteligencia Artificial
              </p>

              <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-gray-300 mb-12">
                <p>
                  Somos un <span className="text-white font-semibold">colectivo de artistas, creadores y tecnólogos</span> comprometidos con la exploración de las fronteras entre el arte tradicional y las nuevas tecnologías.
                </p>

                <p>
                  Nuestra misión es <span className="text-yellow-500 font-semibold">democratizar el acceso a las herramientas de inteligencia artificial</span> para artistas y creativos, fomentando la innovación y la experimentación en el arte contemporáneo.
                </p>

                <p>
                  Creemos que la <span className="text-white font-semibold">inteligencia artificial</span> no reemplaza la creatividad humana, sino que la potencia y expande, abriendo nuevas posibilidades expresivas para artistas de todas las disciplinas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">¿Qué Hacemos?</h2>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Talleres de IA</h3>
                    <p className="text-gray-400">
                      Ofrecemos talleres especializados donde artistas aprenden a integrar herramientas de IA en su proceso creativo.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Comunidad Creativa</h3>
                    <p className="text-gray-400">
                      Construimos una red de artistas que experimentan y comparten conocimientos sobre arte y tecnología.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Proyectos Colaborativos</h3>
                    <p className="text-gray-400">
                      Desarrollamos proyectos de videoarte, instalaciones interactivas y performances digitales.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Investigación</h3>
                    <p className="text-gray-400">
                      Exploramos las intersecciones entre arte, ciencia y tecnología a través de la práctica y la reflexión.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#contacto"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
              >
                Únete al Colectivo
              </a>
            </div>
          </section>

          <section id="contacto" className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-black to-gray-900">
            <div className="text-center max-w-2xl w-full">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contacto</h2>

              <p className="text-xl text-gray-300 mb-8">
                ¿Quieres ser parte de nuestra comunidad creativa?
              </p>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-500 mb-2">Email</h3>
                    <a
                      href="mailto:nucleocolectivo.art@gmail.com"
                      className="text-white hover:text-yellow-500 transition text-lg"
                    >
                      nucleocolectivo.art@gmail.com
                    </a>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-gray-400 mb-4">Síguenos en redes sociales</p>
                    <div className="flex gap-4 justify-center">
                      <a
                        href="#"
                        className="text-white hover:text-yellow-500 transition"
                        aria-label="Instagram"
                      >
                        Instagram
                      </a>
                      <span className="text-gray-600">|</span>
                      <a
                        href="#"
                        className="text-white hover:text-yellow-500 transition"
                        aria-label="YouTube"
                      >
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-black border-t border-gray-800 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 mb-2">
              © 2024 Núcleo Colectivo - Todos los derechos reservados
            </p>
            <p className="text-gray-500 text-sm">
              Creado por <span className="text-yellow-500 font-semibold">Manuel Palacio</span>
            </p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  )
}

export default App
