import { useLanguage } from '../contexts/LanguageContext';
import { Palette, ArrowRight } from 'lucide-react';

interface ArtistCardProps {
  nombre: string;
  rol: string;
  tags: string[];
  avatarUrl?: string;
  onViewPortfolio: () => void;
}

export default function ArtistCard({
  nombre,
  rol,
  tags,
  avatarUrl,
  onViewPortfolio
}: ArtistCardProps) {
  const { t } = useLanguage();

  return (
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-yellow-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8 space-y-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-purple-500/20 flex items-center justify-center border-2 border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-110">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={nombre}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Palette className="w-10 h-10 text-yellow-400" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full border-2 border-black group-hover:scale-125 transition-transform duration-300"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-2 line-clamp-1">
              {nombre}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {rol}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-yellow-500/10 to-purple-500/10 text-yellow-400 rounded-full border border-yellow-500/20 group-hover:border-yellow-400/40 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-3 py-1.5 text-xs font-semibold text-gray-400">
              +{tags.length - 3} {t('artistas.mas')}
            </span>
          )}
        </div>

        <button
          onClick={onViewPortfolio}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 hover:from-yellow-500/30 hover:to-purple-500/30 text-white font-bold rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
        >
          <span>{t('artistas.verPortafolio')}</span>
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
