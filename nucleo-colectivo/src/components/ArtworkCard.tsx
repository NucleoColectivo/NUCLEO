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
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-60 blur-lg transition-all duration-500"></div>

      <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 group-hover:border-yellow-500/40 transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative p-7 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-4 py-2 text-xs font-bold bg-white/10 backdrop-blur-sm text-yellow-400 rounded-full border border-yellow-500/40 shadow-lg">
                  {categoria}
                </span>
                {videoUrl && (
                  <div className="p-2 bg-purple-500/30 backdrop-blur-sm rounded-full border border-purple-500/40 shadow-lg">
                    <Play className="w-4 h-4 text-purple-300" />
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-purple-400 transition-all duration-500 line-clamp-2 drop-shadow-lg mb-3">
                {titulo}
              </h3>

              <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                <span>{tipo}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span>
                <span>{anio}</span>
              </div>
            </div>

            {videoUrl && (
              <button
                onClick={handleOpenWork}
                className="p-3 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 hover:from-yellow-500/40 hover:to-purple-500/40 backdrop-blur-sm text-yellow-400 rounded-xl border border-yellow-500/40 hover:border-yellow-400/70 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 hover:scale-110"
                aria-label={t('artistas.verObra')}
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-gray-300 text-base leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-500">
            {descripcion}
          </p>

          {videoUrl && (
            <button
              onClick={handleOpenWork}
              className="w-full px-5 py-3 bg-gradient-to-r from-yellow-500/15 via-purple-500/15 to-pink-500/15 hover:from-yellow-500/30 hover:via-purple-500/30 hover:to-pink-500/30 backdrop-blur-sm text-yellow-400 text-sm font-bold rounded-xl border border-yellow-500/40 hover:border-yellow-400/70 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-white/10 to-yellow-500/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
              <Play className="w-5 h-5 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
              <span className="relative z-10">{t('artistas.verProyectoCompleto')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
