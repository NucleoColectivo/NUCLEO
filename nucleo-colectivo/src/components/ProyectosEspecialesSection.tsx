export default function ProyectosEspecialesSection() {
  const projects = [
    {
      id: 1,
      title: 'Cosiaca 350',
      tagline: 'Humor, cultura popular y memoria',
      description: 'Universo narrativo que explora la identidad cultural latinoamericana a través del humor gráfico, la sátira social y el rescate de la memoria colectiva. Un proyecto editorial que funciona como archivo vivo y generador de contenido.',
      category: 'Editorial / Narrativa',
      image: '/backgrounds/bg-popart-paint.png',
      active: true,
      featured: true,
    },
  ];

  return (
    <section id="proyectos" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950 to-black" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/backgrounds/bg-theater-drama.png')] bg-cover bg-center" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Proyectos{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
              Especiales
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Universos narrativos y líneas editoriales con identidad propia.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-gradient-to-br from-purple-900/30 to-yellow-900/20 border border-yellow-500/30 rounded-2xl overflow-hidden hover:border-yellow-500 transition-all hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 popart-vibrant"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-full">
                      Proyecto Activo
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-purple-400 font-semibold">{project.category}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-3">{project.title}</h3>
                  <p className="text-2xl text-yellow-400 mb-6 font-semibold italic">
                    {project.tagline}
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-8">{project.description}</p>

                  <div className="space-y-3">
                    <a
                      href="#contacto"
                      className="block text-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all"
                    >
                      Explorar Proyecto
                    </a>
                    <button className="block w-full text-center px-8 py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all">
                      Ver Contenido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-yellow-900/20 to-purple-900/30 border border-purple-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Más Proyectos en Desarrollo
            </h3>
            <p className="text-gray-400 mb-6">
              Esta sección permite el crecimiento de IPs culturales con identidad propia, sin
              desconectarlas del núcleo del proyecto.
            </p>
            <a
              href="#contacto"
              className="inline-block px-6 py-3 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold rounded-lg transition-all"
            >
              Proponer Colaboración
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
