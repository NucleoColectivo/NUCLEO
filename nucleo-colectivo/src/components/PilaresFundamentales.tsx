import { useLanguage } from '../contexts/LanguageContext'

interface Pillar {
  id: string
  title_es: string
  title_en: string
  description_es: string
  description_en: string
  icon_type: string
}

const iconMap: { [key: string]: JSX.Element } = {
  users: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  heart: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

const staticPillars: Pillar[] = [
  {
    id: '1',
    title_es: 'Comunidad Creativa',
    title_en: 'Creative Community',
    description_es: 'Fomentamos la colaboración entre artistas, tecnólogos y pensadores para crear juntos',
    description_en: 'We foster collaboration between artists, technologists and thinkers to create together',
    icon_type: 'users'
  },
  {
    id: '2',
    title_es: 'Innovación Artística',
    title_en: 'Artistic Innovation',
    description_es: 'Exploramos nuevas formas de expresión a través de la tecnología y la creatividad',
    description_en: 'We explore new forms of expression through technology and creativity',
    icon_type: 'sparkles'
  },
  {
    id: '3',
    title_es: 'Acceso Democrático',
    title_en: 'Democratic Access',
    description_es: 'Democratizamos el acceso a herramientas y conocimiento para todos',
    description_en: 'We democratize access to tools and knowledge for everyone',
    icon_type: 'heart'
  },
  {
    id: '4',
    title_es: 'Impacto Global',
    title_en: 'Global Impact',
    description_es: 'Creamos iniciativas que trascienden fronteras y conectan culturas',
    description_en: 'We create initiatives that transcend borders and connect cultures',
    icon_type: 'globe'
  }
]

const PilaresFundamentales = () => {
  const { language } = useLanguage()

  return (
    <section
      id="pilares"
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-nuclear-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nuclear-purple/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-purple/20 text-nuclear-purple px-6 py-2 rounded-full text-sm font-bold border border-nuclear-purple/30 mb-4">
            {language === 'es' ? 'NUESTROS PILARES' : 'OUR PILLARS'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-nuclear-black mb-6 font-montserrat">
            {language === 'es' ? 'Valores Fundamentales' : 'Core Values'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Los principios que guían nuestra misión de transformar el arte y la tecnología'
              : 'The principles that guide our mission to transform art and technology'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staticPillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-nuclear-purple hover:shadow-2xl transition-all duration-500 h-full transform hover:scale-105">
                <div className="text-nuclear-purple mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[pillar.icon_type] || iconMap.sparkles}
                </div>
                <h3 className="text-2xl font-bold text-nuclear-black mb-4">
                  {language === 'es' ? pillar.title_es : pillar.title_en}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'es' ? pillar.description_es : pillar.description_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PilaresFundamentales
