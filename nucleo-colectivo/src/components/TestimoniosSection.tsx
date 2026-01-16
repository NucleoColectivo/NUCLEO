import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface Testimonial {
  id: string
  author_name: string
  author_role: string
  content: string
  rating: number
  workshop_name: string
  is_featured: boolean
}

const TestimoniosSection = () => {
  const { language } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  if (loading) {
    return (
      <section className="py-20 bg-nuclear-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-nuclear-purple border-t-nuclear-yellow rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  return (
    <section id="testimonios" className="relative py-20 md:py-32 bg-gradient-to-b from-nuclear-white to-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-nuclear-purple/20 text-nuclear-purple px-6 py-2 rounded-full text-sm font-bold border border-nuclear-purple/50 mb-4">
            {language === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS'}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-nuclear-black mb-6 font-montserrat">
            {language === 'es' ? 'Lo Que Dicen Nuestros Artistas' : 'What Our Artists Say'}
          </h2>
          <p className="text-xl text-nuclear-black/70 max-w-3xl mx-auto">
            {language === 'es'
              ? 'Experiencias reales de quienes han transformado su creatividad con nosotros'
              : 'Real experiences from those who have transformed their creativity with us'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ${
                  index === activeIndex
                    ? 'opacity-100 scale-100 relative'
                    : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border-2 border-nuclear-yellow/20">
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-8 h-8 text-nuclear-yellow"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-nuclear-black/80 text-center mb-8 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-nuclear-yellow to-nuclear-purple rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                      {testimonial.author_name.charAt(0)}
                    </div>
                    <h4 className="text-xl font-bold text-nuclear-black font-montserrat">
                      {testimonial.author_name}
                    </h4>
                    <p className="text-nuclear-black/60 mb-2">{testimonial.author_role}</p>
                    {testimonial.workshop_name && (
                      <span className="inline-block bg-nuclear-yellow/20 text-nuclear-purple px-4 py-1 rounded-full text-sm font-semibold">
                        {testimonial.workshop_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-nuclear-yellow'
                    : 'w-3 h-3 bg-nuclear-yellow/30 hover:bg-nuclear-yellow/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimoniosSection
