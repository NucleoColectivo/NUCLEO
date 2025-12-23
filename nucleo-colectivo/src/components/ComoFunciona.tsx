import { useLanguage } from '../contexts/LanguageContext'

interface Step {
  number: string
  titleES: string
  titleEN: string
  descriptionES: string
  descriptionEN: string
  icon: JSX.Element
}

const ComoFunciona = () => {
  const { language } = useLanguage()

  const steps: Step[] = [
    {
      number: '01',
      titleES: 'Descubre',
      titleEN: 'Discover',
      descriptionES: 'Explora nuestros talleres gratuitos de IA aplicada al arte y la creatividad',
      descriptionEN: 'Explore our free workshops on AI applied to art and creativity',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: '02',
      titleES: 'Regístrate',
      titleEN: 'Register',
      descriptionES: 'Inscríbete en los talleres que más te interesen. ¡Es completamente gratis!',
      descriptionEN: 'Sign up for the workshops that interest you most. It\'s completely free!',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      number: '03',
      titleES: 'Aprende',
      titleEN: 'Learn',
      descriptionES: 'Participa en sesiones prácticas con expertos y descubre herramientas de IA',
      descriptionEN: 'Participate in hands-on sessions with experts and discover AI tools',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      number: '04',
      titleES: 'Crea',
      titleEN: 'Create',
      descriptionES: 'Desarrolla tus proyectos artísticos con el apoyo de nuestra comunidad',
      descriptionEN: 'Develop your artistic projects with the support of our community',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ]

  return (
    <section id="como-funciona" className="relative py-20 md:py-32 bg-gradient-to-b from-white to-nuclear-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-nuclear-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nuclear-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-yellow/20 text-nuclear-purple px-6 py-2 rounded-full text-sm font-bold border border-nuclear-yellow/50 mb-4">
            {language === 'es' ? 'PROCESO' : 'PROCESS'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-nuclear-black mb-6 font-montserrat">
            {language === 'es' ? '¿Cómo Funciona?' : 'How It Works?'}
          </h2>
          <p className="text-xl text-nuclear-black/70 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Un proceso simple para comenzar tu viaje creativo con IA'
              : 'A simple process to start your creative journey with AI'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-nuclear-yellow via-nuclear-purple to-nuclear-yellow opacity-20 transform -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-nuclear-yellow/20 hover:border-nuclear-purple hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-3">
                <div className="relative mb-6">
                  <div className="absolute -top-4 -right-4 text-7xl font-bold text-nuclear-yellow/20 font-montserrat">
                    {step.number}
                  </div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-nuclear-yellow to-nuclear-purple rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-nuclear-black mb-4 font-montserrat relative z-10">
                  {language === 'es' ? step.titleES : step.titleEN}
                </h3>

                <p className="text-nuclear-black/70 leading-relaxed relative z-10">
                  {language === 'es' ? step.descriptionES : step.descriptionEN}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#talleres"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-nuclear-yellow to-orange-400 text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {language === 'es' ? 'Ver Talleres Disponibles' : 'View Available Workshops'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ComoFunciona
