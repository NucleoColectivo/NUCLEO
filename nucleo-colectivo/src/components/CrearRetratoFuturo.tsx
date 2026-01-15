import { Brain, Image, Wand2 } from 'lucide-react';

export default function CrearRetratoFuturo() {
  return (
    <section id="retrato-futuro" className="py-20 bg-gradient-to-br from-black via-purple-950/30 to-black">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-3xl p-8 md:p-12 border border-yellow-500/20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Wand2 className="w-10 h-10 text-yellow-400" />
              <span>Crear mi Retrato Futuro</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Usa IA para crear retratos únicos que reflejen tu visión artística del futuro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Describe tu visión:
                </label>
                <textarea
                  placeholder="Ej: Un artista cyberpunk en un mundo futurista con neones morados..."
                  className="w-full h-40 bg-white/10 border border-yellow-500/30 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Estilo</label>
                  <select className="w-full bg-white/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                    <option value="">Seleccionar estilo</option>
                    <option value="cyberpunk">Cyberpunk</option>
                    <option value="futurista">Futurista</option>
                    <option value="artistico">Artístico</option>
                    <option value="dreamy">Onírico</option>
                    <option value="realista">Realista</option>
                    <option value="abstracto">Abstracto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Color Dominante</label>
                  <select className="w-full bg-white/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500">
                    <option value="">Seleccionar color</option>
                    <option value="neon">Neón</option>
                    <option value="warm">Cálidos</option>
                    <option value="cool">Fríos</option>
                    <option value="monochrome">Monocromático</option>
                    <option value="vibrant">Vibrante</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <Brain className="w-5 h-5" />
                <span>Generar Retrato con IA</span>
              </button>

              <p className="text-sm text-gray-400 text-center">
                Próximamente: Integración con generadores de imágenes IA
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-yellow-500/20">
              <div className="aspect-square bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-300 text-lg">Tu retrato aparecerá aquí</p>
                  <p className="text-gray-500 text-sm mt-2">Describe tu visión y genera</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/30 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3 text-center">
              🎨 Consejos para mejores resultados
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Sé específico con detalles visuales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Menciona colores y atmósfera deseada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Describe emociones o conceptos artísticos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Experimenta con diferentes estilos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
