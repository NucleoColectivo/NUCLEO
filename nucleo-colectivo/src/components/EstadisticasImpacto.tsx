import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useLanguage } from '../contexts/LanguageContext'

interface Statistic {
  id: string
  label: string
  value: number
  icon: string
  description: string
  order_index: number
}

const iconMap: { [key: string]: JSX.Element } = {
  Users: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Briefcase: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Clock: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sparkles: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

const EstadisticasImpacto = () => {
  const { language } = useLanguage()
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const { data, error } = await supabase
          .from('statistics')
          .select('*')
          .order('order_index', { ascending: true })

        if (error) {
          console.error('Error loading statistics:', error)
        } else if (data) {
          setStatistics(data)
          const initialValues: { [key: string]: number } = {}
          data.forEach((stat) => {
            initialValues[stat.id] = 0
          })
          setAnimatedValues(initialValues)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStatistics()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible && statistics.length > 0) {
      statistics.forEach((stat) => {
        const duration = 2000
        const steps = 60
        const increment = stat.value / steps
        let currentStep = 0

        const interval = setInterval(() => {
          currentStep++
          setAnimatedValues((prev) => ({
            ...prev,
            [stat.id]: Math.min(Math.round(increment * currentStep), stat.value)
          }))

          if (currentStep >= steps) {
            clearInterval(interval)
          }
        }, duration / steps)
      })
    }
  }, [isVisible, statistics])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-nuclear-purple border-t-nuclear-yellow rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="impacto"
      className="relative py-20 md:py-32 bg-gradient-to-br from-nuclear-purple to-purple-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-nuclear-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nuclear-yellow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-yellow/30 text-white px-6 py-2 rounded-full text-sm font-bold border border-nuclear-yellow/50 mb-4">
            {language === 'es' ? 'NUESTRO IMPACTO' : 'OUR IMPACT'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat">
            {language === 'es' ? 'Transformando la Creatividad' : 'Transforming Creativity'}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Números que reflejan nuestra dedicación a democratizar el acceso al arte y la tecnología'
              : 'Numbers that reflect our dedication to democratizing access to art and technology'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:border-nuclear-yellow hover:bg-white/20 transition-all duration-500 h-full transform hover:scale-105">
                <div className="text-nuclear-yellow mb-4 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[stat.icon] || iconMap.Sparkles}
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-montserrat">
                  {animatedValues[stat.id] || 0}+
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <p className="text-white/70 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#quienes-somos"
            className="inline-flex items-center gap-2 bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {language === 'es' ? 'Únete a Nuestra Comunidad' : 'Join Our Community'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default EstadisticasImpacto
