export default function MiembrosSection() {
  const members = [
    {
      name: 'Manuel Palacio',
      role: 'Artista, Diseñador, Creador Cultural',
      slug: 'manuel-palacio',
      bio: 'Artista visual y mediador cultural especializado en la intersección entre arte, tecnología e inteligencia artificial.',
      disciplines: ['Ilustración', 'Instalaciones Interactivas', 'Narrativa Visual', 'Arte + IA'],
      image: '/images/artist-avatar.svg',
      featured: true,
    },
    {
      name: 'Carlos',
      role: 'Artista, Creador, Investigador Visual',
      slug: 'carlos',
      bio: 'Artista-investigador enfocado en prácticas artísticas contemporáneas y exploración visual y conceptual.',
      disciplines: ['Arte Contemporáneo', 'Investigación Visual', 'Proyectos Experimentales'],
      image: '/images/artist-avatar.svg',
      featured: true,
    },
  ];

  return (
    <section id="miembros" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950 to-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[url('/backgrounds/bg-pencil-paint.png')] bg-cover bg-center" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('/backgrounds/bg-palette.png')] bg-cover bg-center" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Quiénes Están{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Detrás
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Antes de mostrar proyectos o servicios, mostramos personas. La obra habla primero, el
            contexto acompaña.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {members.map((member) => (
            <div
              key={member.slug}
              className="group bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-purple-600 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-300 font-medium">{member.role}</p>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{member.bio}</p>

              <div className="mb-6">
                <h4 className="text-yellow-400 font-semibold mb-3">Disciplinas:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.disciplines.map((discipline) => (
                    <span
                      key={discipline}
                      className="px-3 py-1 bg-purple-800/50 text-purple-200 rounded-full text-sm border border-purple-600"
                    >
                      {discipline}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={`#portafolio-${member.slug}`}
                className="block w-full text-center px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all transform group-hover:scale-105"
              >
                Ver Portafolio
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Esta plataforma crece. Nuevos miembros, nuevas visiones.
          </p>
          <a
            href="#contacto"
            className="inline-block px-6 py-3 border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all"
          >
            Únete al Núcleo
          </a>
        </div>
      </div>
    </section>
  );
}
