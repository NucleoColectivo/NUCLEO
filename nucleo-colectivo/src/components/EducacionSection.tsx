export default function EducacionSection() {
  const workshops = [
    {
      id: 1,
      title: 'IA para Procesos Creativos',
      focus: 'Integración de herramientas de IA en flujos de trabajo artístico',
      duration: '8 semanas',
      format: 'Online + Presencial',
      audience: 'Artistas, diseñadores y creadores',
      price: 'Consultar',
      featured: true,
    },
    {
      id: 2,
      title: 'Metodologías Experimentales',
      focus: 'Exploración de procesos creativos no lineales',
      duration: '4 semanas',
      format: 'Presencial',
      audience: 'Artistas visuales y conceptuales',
      price: 'Consultar',
      featured: true,
    },
    {
      id: 3,
      title: 'Narrativas Transmedia',
      focus: 'Construcción de universos narrativos multiplataforma',
      duration: '6 semanas',
      format: 'Online',
      audience: 'Escritores, artistas y desarrolladores',
      price: 'Consultar',
      featured: false,
    },
  ];

  return (
    <section id="educacion" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950 to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[url('/backgrounds/bg-literature-words.png')] bg-cover bg-center" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[url('/backgrounds/bg-lab-creative.png')] bg-cover bg-center" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Educación
            </span>{' '}
            Creativa
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Talleres y procesos pedagógicos. La educación como extensión de la obra.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto mb-12">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="group bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition-all hover:scale-102 hover:shadow-2xl hover:shadow-yellow-500/20"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{workshop.title}</h3>
                  <p className="text-purple-300">{workshop.focus}</p>
                </div>
                {workshop.featured && (
                  <div className="mt-4 md:mt-0 px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full">
                    Destacado
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Duración</p>
                  <p className="text-white">{workshop.duration}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Formato</p>
                  <p className="text-white">{workshop.format}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Audiencia</p>
                  <p className="text-white">{workshop.audience}</p>
                </div>
                <div>
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Inversión</p>
                  <p className="text-white">{workshop.price}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="#contacto"
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
                >
                  Inscribirse
                </a>
                <button className="px-6 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all">
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-yellow-900/20 to-purple-900/30 border border-yellow-500/30 rounded-2xl p-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Metodología Propia</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">Adaptabilidad</h4>
              <p className="text-gray-400 text-sm">
                Cada taller se ajusta al contexto y necesidades del grupo
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Práctica Intensiva</h4>
              <p className="text-gray-400 text-sm">
                80% práctica, 20% teoría. Aprender haciendo.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Comunidad</h4>
              <p className="text-gray-400 text-sm">
                Acceso permanente a una red de creadores
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
