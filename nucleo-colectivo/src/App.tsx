import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-yellow-600">
        <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-nucleo-colectivo.png" alt="Logo" className="h-12 w-12" />
              <span className="text-white font-bold text-2xl">Núcleo Colectivo</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#inicio" className="text-white hover:text-yellow-400 transition">Inicio</a>
              <a href="#talleres" className="text-white hover:text-yellow-400 transition">Talleres</a>
              <a href="#galeria" className="text-white hover:text-yellow-400 transition">Galería</a>
              <a href="#contacto" className="text-white hover:text-yellow-400 transition">Contacto</a>
            </nav>
          </div>
        </header>

        <main className="pt-20">
          <section id="inicio" className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-pulse">
                Núcleo Colectivo
              </h1>
              <p className="text-3xl md:text-5xl text-yellow-400 mb-8 font-bold">
                Arte, Tecnología e IA
              </p>
              <p className="text-xl md:text-2xl text-white/90 mb-12">
                Transformando la creatividad a través de la inteligencia artificial
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#talleres"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
                >
                  Ver Talleres
                </a>
                <a
                  href="#galeria"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
                >
                  Explorar Galería
                </a>
              </div>
            </div>
          </section>

          <section id="talleres" className="min-h-screen flex items-center justify-center px-6 bg-black/50">
            <div className="text-center max-w-4xl">
              <h2 className="text-5xl font-bold text-white mb-8">Talleres de IA</h2>
              <p className="text-xl text-white/80 mb-12">
                Aprende a crear arte con inteligencia artificial
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-800 to-purple-600 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Básico</h3>
                  <p className="text-white/90 mb-6">Introducción a la IA creativa</p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg w-full transition">
                    Inscribirse
                  </button>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-black mb-4">Intermedio</h3>
                  <p className="text-black/90 mb-6">Técnicas avanzadas de IA</p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg w-full transition">
                    Inscribirse
                  </button>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Avanzado</h3>
                  <p className="text-white/90 mb-6">Maestría en arte con IA</p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg w-full transition">
                    Inscribirse
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="galeria" className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-6xl">
              <h2 className="text-5xl font-bold text-white mb-8">Galería de Arte</h2>
              <p className="text-xl text-white/80 mb-12">
                Obras creadas por nuestra comunidad
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-500 to-yellow-500 rounded-lg hover:scale-105 transition transform cursor-pointer"></div>
                ))}
              </div>
            </div>
          </section>

          <section id="contacto" className="min-h-screen flex items-center justify-center px-6 bg-black/50">
            <div className="text-center max-w-2xl">
              <h2 className="text-5xl font-bold text-white mb-8">Contacto</h2>
              <p className="text-xl text-white/80 mb-12">
                Únete a nuestra comunidad creativa
              </p>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500"
                />
                <textarea
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500"
                ></textarea>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg w-full text-lg transition transform hover:scale-105">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="bg-black py-8 text-center">
          <p className="text-white/60">
            © 2024 Núcleo Colectivo - Creado por Manuel Palacio
          </p>
        </footer>
      </div>
    </LanguageProvider>
  )
}

export default App
