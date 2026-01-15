import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink, Play } from 'lucide-react';

interface ArtworkCardProps {
  titulo: string;
  tipo: string;
  anio: number;
  descripcion: string;
  categoria: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export default function ArtworkCard({
  titulo,
  tipo,
  anio,
  descripcion,
  categoria,
  videoUrl,
  thumbnailUrl
}: ArtworkCardProps) {
  const { t } = useLanguage();

  const handleOpenWork = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-purple-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                {categoria}
              </span>
              {videoUrl && (
                <div className="p-1.5 bg-purple-500/20 rounded-full border border-purple-500/30">
                  <Play className="w-3 h-3 text-purple-400" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
              {titulo}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
              <span>{tipo}</span>
              <span>•</span>
              <span>{anio}</span>
            </div>
          </div>

          {videoUrl && (
            <button
              onClick={handleOpenWork}
              className="p-2 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 hover:from-yellow-500/30 hover:to-purple-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300"
              aria-label={t('artistas.verObra')}
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
          {descripcion}
        </p>

        {videoUrl && (
          <button
            onClick={handleOpenWork}
            className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 hover:from-yellow-500/20 hover:to-purple-500/20 text-yellow-400 text-sm font-semibold rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            {t('artistas.verProyectoCompleto')}
          </button>
        )}
      </div>
    </div>
  );
}
