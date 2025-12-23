import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import './App.css'

const AppContent = () => {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-yellow-500 font-montserrat">
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-pulse">
            Núcleo Colectivo
          </h1>
          <p className="text-2xl md:text-4xl text-yellow-300 mb-8 font-bold">
            {language === 'es' ? 'Arte, Tecnología e IA' : 'Art, Technology & AI'}
          </p>
          <div className="space-y-4">
            <p className="text-xl md:text-2xl text-white/90">
              {language === 'es'
                ? 'Transformando la creatividad a través de la inteligencia artificial'
                : 'Transforming creativity through artificial intelligence'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
