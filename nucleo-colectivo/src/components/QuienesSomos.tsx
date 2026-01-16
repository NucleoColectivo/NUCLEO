import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface AboutData {
  mission: string
  vision: string
  description: string
  values: string[]
}

const QuienesSomos = () => {
  const { language } = useLanguage()
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section id="quienes-somos" className="min-h-screen flex items-center justify-center bg-nuclear-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-nuclear-purple border-t-nuclear-yellow rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-nuclear-purple font-montserrat font-medium">
            {language === 'es' ? 'Cargando...' : 'Loading...'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="quienes-somos" className="relative py-20 md:py-32 bg-gradient-to-b from-white to-nuclear-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-yellow/20 text-nuclear-purple px-6 py-2 rounded-full text-sm font-bold border border-nuclear-yellow/50 mb-4">
            {language === 'es' ? '¿QUIÉNES SOMOS?' : 'WHO ARE WE?'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-nuclear-black mb-6 font-montserrat">
            Núcleo Colectivo
          </h2>
          <p className="text-xl text-nuclear-black/70 max-w-4xl mx-auto leading-relaxed">
            {language === 'es'
              ? 'Un espacio de co-creación donde el arte, la tecnología y la inteligencia artificial se encuentran para transformar la cultura'
              : 'A co-creation space where art, technology and artificial intelligence meet to transform culture'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="group">
            <div className="bg-white rounded-3xl p-10 border-2 border-nuclear-yellow/30 hover:border-nuclear-yellow hover:shadow-2xl transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-nuclear-yellow to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-nuclear-black mb-4 font-montserrat">
                {language === 'es' ? 'Nuestra Misión' : 'Our Mission'}
              </h3>
              <p className="text-nuclear-black/70 text-lg leading-relaxed">
                {aboutData?.mission || 'Fomentar la co-creación artística e innovación cultural mediante la integración de inteligencia artificial como herramienta creativa'}
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-3xl p-10 border-2 border-nuclear-purple/30 hover:border-nuclear-purple hover:shadow-2xl transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-nuclear-purple to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-nuclear-black mb-4 font-montserrat">
                {language === 'es' ? 'Nuestra Visión' : 'Our Vision'}
              </h3>
              <p className="text-nuclear-black/70 text-lg leading-relaxed">
                {aboutData?.vision || 'Ser un espacio referente en Latinoamérica para la transformación del arte y la economía creativa a través de la tecnología'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-nuclear-yellow/10 via-white to-nuclear-purple/10 rounded-3xl p-12 shadow-xl border border-nuclear-yellow/20 mb-16">
          <p className="text-xl text-nuclear-black/80 leading-relaxed text-center max-w-5xl mx-auto">
            {aboutData?.description || 'Núcleo Colectivo es un espacio dinámico e interdisciplinario de colaboración donde artistas, emprendedores y la comunidad se reúnen para explorar las fronteras entre el arte, la tecnología y la inteligencia artificial.'}
          </p>
        </div>

        {aboutData?.values && aboutData.values.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-nuclear-black mb-10 text-center font-montserrat">
              {language === 'es' ? 'Nuestros Valores' : 'Our Values'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {aboutData.values.map((valor, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-nuclear-yellow to-nuclear-purple p-6 rounded-2xl text-white text-center font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                    {valor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default QuienesSomos
