export default function ObraSection() {
  const artworks = [
    {
      id: 1,
      title: 'Instalación Neural',
      category: 'Instalación Interactiva',
      year: 2026,
      description: 'Experiencia inmersiva que explora la conexión entre procesos creativos humanos y algoritmos de IA.',
      image: '/backgrounds/bg-neural-art.png',
      availableForSale: true,
      featured: true,
    },
    {
      id: 2,
      title: 'Realidad Aumentada',
      category: 'Arte + Tecnología',
      year: 2026,
      description: 'Proyecto que fusiona espacios físicos con capas digitales interactivas.',
      image: '/backgrounds/bg-ar-reality.png',
      availableForSale: true,
      featured: true,
    },
    {
      id: 3,
      title: 'Sinfonía Digital',
      category: 'Arte Sonoro',
      year: 2026,
      description: 'Composición generativa que responde a datos en tiempo real del entorno urbano.',
      image: '/backgrounds/bg-digital-symphony.png',
      availableForSale: false,
      featured: true,
    },
    {
      id: 4,
      title: 'Cosmos Conectado',
      category: 'Multimedia',
      year: 2027,
      description: 'Visualización de redes invisibles que conectan comunidades digitales.',
      image: '/backgrounds/bg-cosmic-digital.png',
      availableForSale: true,
      featured: false,
    },
    {
      id: 5,
      title: 'Danza de Datos',
      category: 'Performance Digital',
      year: 2026,
      description: 'Coreografía generada por algoritmos que responde al movimiento humano.',
      image: '/backgrounds/bg-dance-flow.png',
      availableForSale: false,
      featured: false,
    },
    {
      id: 6,
      title: 'Cinema Experimental',
      category: 'Videoarte',
      year: 2026,
      description: 'Narrativas cinematográficas fragmentadas y remezcladas por IA.',
      image: '/backgrounds/bg-cinema-film.png',
      availableForSale: true,
      featured: false,
    },
    {
      id: 7,
      title: 'Laboratorio Creativo',
      category: 'Instalación Interactiva',
      year: 2027,
      description: 'Espacio experimental donde el público co-crea con inteligencia artificial.',
      image: '/backgrounds/bg-lab-creative.png',
      availableForSale: false,
      featured: false,
    },
    {
      id: 8,
      title: 'Sinestesia Visual',
      category: 'Arte Generativo',
      year: 2026,
      description: 'Traducción visual de experiencias sensoriales múltiples.',
      image: '/backgrounds/bg-synesthesia-senses.png',
      availableForSale: true,
      featured: false,
    },
    {
      id: 9,
      title: 'Teatro Aumentado',
      category: 'Performance + IA',
      year: 2027,
      description: 'Obras teatrales donde actores humanos dialogan con personajes generados por IA.',
      image: '/backgrounds/bg-theater-drama.png',
      availableForSale: false,
      featured: false,
    },
  ];

  return (
    <section id="obra" className="min-h-screen py-20 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Vitrina{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Artística
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            La obra no se muestra como archivo muerto, sino como{' '}
            <span className="text-yellow-400 font-semibold">material activo</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group relative bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-yellow-500/30 rounded-2xl overflow-hidden hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${artwork.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                {artwork.availableForSale && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    Disponible
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-purple-400 text-sm font-semibold">{artwork.category}</span>
                  <span className="text-gray-500 text-sm ml-2">· {artwork.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{artwork.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{artwork.description}</p>
                <button className="w-full px-6 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-6">
            Cada proyecto incluye contexto, formatos de activación y opciones de circulación.
          </p>
          <a
            href="#contacto"
            className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
          >
            Consultar Encargos
          </a>
        </div>
      </div>
    </section>
  );
}
