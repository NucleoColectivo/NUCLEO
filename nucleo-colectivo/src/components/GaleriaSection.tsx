import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Palette, Music, Film, Sparkles } from 'lucide-react';

export default function GaleriaSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('todos');

  const galeria = [
    { id: 1, title: 'Arte Neural', image: '/backgrounds/bg-neural-art.png', category: 'ia', description: 'Exploración de redes neuronales visuales' },
    { id: 2, title: 'Realidad Aumentada', image: '/backgrounds/bg-ar-reality.png', category: 'tech', description: 'Fusión de mundos físicos y digitales' },
    { id: 3, title: 'Sinfonía Digital', image: '/backgrounds/bg-digital-symphony.png', category: 'musica', description: 'Composiciones generativas algorítmicas' },
    { id: 4, title: 'Cosmos Conectado', image: '/backgrounds/bg-cosmic-digital.png', category: 'ia', description: 'Visualización de datos cósmicos' },
    { id: 5, title: 'Danza de Datos', image: '/backgrounds/bg-dance-flow.png', category: 'performance', description: 'Coreografía generada por algoritmos' },
    { id: 6, title: 'Cinema Experimental', image: '/backgrounds/bg-cinema-film.png', category: 'cine', description: 'Narrativas fragmentadas por IA' },
    { id: 7, title: 'Laboratorio Creativo', image: '/backgrounds/bg-lab-creative.png', category: 'tech', description: 'Espacio de experimentación colectiva' },
    { id: 8, title: 'Sinestesia Visual', image: '/backgrounds/bg-synesthesia-senses.png', category: 'arte', description: 'Traducción de experiencias sensoriales' },
    { id: 9, title: 'Teatro Aumentado', image: '/backgrounds/bg-theater-drama.png', category: 'performance', description: 'Performance híbrido humano-IA' },
    { id: 10, title: 'Música Sinfónica', image: '/backgrounds/bg-music-symphony.png', category: 'musica', description: 'Orquestaciones algorítmicas' },
    { id: 11, title: 'Fotografía Conceptual', image: '/backgrounds/bg-photography-lens.png', category: 'arte', description: 'Lente expandido por tecnología' },
    { id: 12, title: 'Literatura Visual', image: '/backgrounds/bg-literature-words.png', category: 'arte', description: 'Palabras como materia visual' },
    { id: 13, title: 'Cubismo Digital', image: '/backgrounds/bg-cubism-paint.png', category: 'arte', description: 'Fragmentación geométrica algorítmica' },
    { id: 14, title: 'Impresionismo IA', image: '/backgrounds/bg-impressionism-paint.png', category: 'arte', description: 'Pinceladas generadas por redes neuronales' },
    { id: 15, title: 'Pop Art Remix', image: '/backgrounds/bg-popart-paint.png', category: 'arte', description: 'Cultura popular remezclada' },
    { id: 16, title: 'Modernismo Tech', image: '/backgrounds/bg-modernism-paint.png', category: 'arte', description: 'Abstracción geométrica digital' },
    { id: 17, title: 'Acuarelas Digitales', image: '/backgrounds/bg-watercolor-paint.png', category: 'arte', description: 'Fluidez algorítmica' },
    { id: 18, title: 'Lápiz y Píxel', image: '/backgrounds/bg-pencil-paint.png', category: 'arte', description: 'Fusión de técnicas tradicionales y digitales' },
    { id: 19, title: 'Escultura Digital', image: '/backgrounds/bg-sculpture-digital.png', category: 'tech', description: 'Formas tridimensionales generativas' },
    { id: 20, title: 'Tejido de Datos', image: '/backgrounds/bg-textile-weaving.png', category: 'arte', description: 'Patrones textiles algorítmicos' },
    { id: 21, title: 'Biología Sintética', image: '/backgrounds/bg-biology-science.png', category: 'ciencia', description: 'Arte biodigital' },
  ];

  const categorias = [
    { id: 'todos', nombre: 'Todo', icon: Sparkles },
    { id: 'arte', nombre: 'Arte Visual', icon: Palette },
    { id: 'musica', nombre: 'Música', icon: Music },
    { id: 'cine', nombre: 'Cine', icon: Film },
    { id: 'ia', nombre: 'IA', icon: Sparkles },
    { id: 'tech', nombre: 'Tecnología', icon: Sparkles },
    { id: 'performance', nombre: 'Performance', icon: Sparkles },
  ];

  const imagenesFiltradas = filter === 'todos' 
    ? galeria 
    : galeria.filter(item => item.category === filter);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = imagenesFiltradas.findIndex(img => img.id === selectedImage);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : imagenesFiltradas.length - 1;
      setSelectedImage(imagenesFiltradas[newIndex].id);
    } else {
      const newIndex = currentIndex < imagenesFiltradas.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(imagenesFiltradas[newIndex].id);
    }
  };

  const selectedItem = selectedImage !== null 
    ? imagenesFiltradas.find(img => img.id === selectedImage) 
    : null;

  return (
    <>
      <section id="galeria" className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/backgrounds/bg-1.png')] bg-cover bg-center" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Galería{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
                Completa
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Explora nuestro universo visual: desde arte generativo hasta instalaciones interactivas.
              Cada imagen representa un proyecto, una idea, una posibilidad.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categorias.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${"${"}
                      filter === cat.id
                        ? 'bg-gradient-to-r from-yellow-400 to-purple-500 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    ${"}"}`}
                  >
                    <Icon size={16} />
                    {cat.nombre}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagenesFiltradas.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer border-2 border-gray-800 hover:border-yellow-400 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-xs line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              {imagenesFiltradas.length} proyecto{imagenesFiltradas.length !== 1 ? 's' : ''} en esta categoría
            </p>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="text-white" size={24} />
          </button>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="text-white" size={32} />
          </button>

          <div className="max-w-6xl w-full">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedItem.image})` }}
              />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h3>
              <p className="text-gray-300 text-lg mb-4">{selectedItem.description}</p>
              <span className="inline-block px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
                {categorias.find(c => c.id === selectedItem.category)?.nombre || selectedItem.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
