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
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-0 group-hover:opacity-75 blur-xl transition-all duration-700 group-hover:duration-500 animate-pulse"></div>

      <div className="relative bg-black/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-yellow-500/50 transition-all duration-700 hover:scale-[1.02] shadow-2xl hover:shadow-yellow-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-500/20 via-purple-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative p-8 space-y-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-yellow-400/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={nombre}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Palette className="w-12 h-12 text-yellow-400 drop-shadow-2xl" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 rounded-full border-4 border-black/80 group-hover:scale-125 transition-transform duration-500 shadow-lg shadow-yellow-500/50"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-purple-400 transition-all duration-500 mb-3 line-clamp-1 drop-shadow-lg">
                {nombre}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-500">
                {rol}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 text-xs font-bold bg-white/5 backdrop-blur-sm text-yellow-400 rounded-full border border-yellow-500/30 group-hover:border-yellow-400/60 group-hover:bg-white/10 transition-all duration-500 shadow-lg hover:scale-105"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-4 py-2 text-xs font-bold text-gray-400 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <button
            onClick={onViewPortfolio}
            className="w-full px-6 py-4 bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-pink-500/20 hover:from-yellow-500/40 hover:via-purple-500/40 hover:to-pink-500/40 backdrop-blur-sm text-white font-bold rounded-xl border border-yellow-500/40 hover:border-yellow-400/70 transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-white/20 to-yellow-500/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="relative z-10">{t('artistas.verPortafolio')}</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
