export default function ContenidosSection() {
  const contentTypes = [
    {
      type: 'Textos',
      icon: '📝',
      count: '12+',
      description: 'Ensayos, reflexiones y artículos sobre arte, cultura y tecnología',
    },
    {
      type: 'Videos',
      icon: '🎥',
      count: '8+',
      description: 'Documentación de procesos, tutoriales y registros de obra',
    },
    {
      type: 'Podcasts',
      icon: '🎙️',
      count: 'Próximamente',
      description: 'Conversaciones con artistas, creadores y pensadores',
    },
    {
      type: 'Procesos',
      icon: '🔬',
      count: '15+',
      description: 'Documentación detallada de metodologías y experimentación',
    },
  ];

  const recentContent = [
    {
      id: 1,
      title: 'IA y Creatividad: Más Allá del Reemplazo',
      type: 'Texto',
      date: '2026-12-15',
      excerpt: 'Reflexión sobre el rol transformador de la inteligencia artificial en procesos creativos contemporáneos.',
      featured: true,
    },
    {
      id: 2,
      title: 'Proceso: Instalación Neural',
      type: 'Video',
      date: '2026-11-20',
      excerpt: 'Registro completo del proceso de creación de nuestra instalación interactiva más reciente.',
      featured: true,
    },
    {
      id: 3,
      title: 'Metodología Experimental en Arte Digital',
      type: 'Proceso',
      date: '2026-10-10',
      excerpt: 'Documentación de nuestro enfoque metodológico para proyectos de arte + tecnología.',
      featured: false,
    },
  ];

  return (
    <section id="contenidos" className="min-h-screen py-20 bg-gradient-to-b from-black via-yellow-950 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Archivo{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Vivo
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            El contenido no es relleno: es <span className="text-yellow-400 font-semibold">pensamiento en circulación</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contentTypes.map((item) => (
            <div
              key={item.type}
              className="bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:border-purple-500 transition-all hover:scale-105"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.type}</h3>
              <p className="text-yellow-400 font-bold mb-3">{item.count}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8">Contenido Reciente</h3>
          <div className="space-y-6">
            {recentContent.map((content) => (
              <div
                key={content.id}
                className="group bg-gradient-to-br from-yellow-900/20 to-purple-900/30 border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500 transition-all hover:scale-102"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-800/50 text-purple-200 rounded-full text-sm font-semibold">
                        {content.type}
                      </span>
                      <span className="text-gray-500 text-sm">{content.date}</span>
                      {content.featured && (
                        <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-bold">
                          Destacado
                        </span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{content.title}</h4>
                    <p className="text-gray-400">{content.excerpt}</p>
                  </div>
                  <button className="mt-4 md:mt-0 md:ml-6 px-6 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all whitespace-nowrap">
                    Leer Más
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contacto"
              className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
            >
              Ver Todo el Archivo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
