import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useLanguage } from '../contexts/LanguageContext'

interface Pillar {
  id: string
  title: string
  description: string
  icon_type: string
  order_index: number
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

const PilaresFundamentales = () => {
  const { language } = useLanguage()
  const [pillars, setPillars] = useState<Pillar[]>([])
  const [loading, setLoading] = useState(true)

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  useEffect(() => {
    const loadPillars = async () => {
      try {
        const { data, error } = await supabase
          .from('pillars')
          .select('*')
          .order('order_index', { ascending: true })

        if (error) {
          console.error('Error loading pillars:', error)
        } else if (data) {
          setPillars(data)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPillars()
  }, [])

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
    <section id="pilares" className="relative py-20 md:py-32 bg-nuclear-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,215,0,0.15),transparent_60%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-purple/20 text-nuclear-purple px-6 py-2 rounded-full text-sm font-bold border border-nuclear-purple/50 mb-4">
            {language === 'es' ? 'NUESTROS PILARES' : 'OUR PILLARS'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-nuclear-black mb-6 font-montserrat">
            {language === 'es' ? 'Pilares Fundamentales' : 'Core Pillars'}
          </h2>
          <p className="text-xl text-nuclear-black/70 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Los valores que guían cada una de nuestras acciones y proyectos'
              : 'The values that guide each of our actions and projects'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-nuclear-yellow/20 hover:border-nuclear-yellow hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-nuclear-yellow to-nuclear-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-white">
                  {iconMap[pillar.icon_type] || iconMap.sparkles}
                </div>
                <h3 className="text-2xl font-bold text-nuclear-black mb-4 font-montserrat">
                  {pillar.title}
                </h3>
                <p className="text-nuclear-black/70 leading-relaxed">
                  {pillar.description}
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
