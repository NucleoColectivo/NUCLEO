import { useLanguage } from '../contexts/LanguageContext';
import { X, Instagram, Youtube, Globe, Palette } from 'lucide-react';
import { useEffect } from 'react';
import ArtworkCard from './ArtworkCard';

interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  video_url?: string;
  thumbnail_url?: string;
}

interface Artist {
  id: string;
  nombre: string;
  rol: string;
  statement: string;
  tags: string[];
  avatar_url?: string;
  links?: {
    instagram?: string;
    youtube?: string;
    web?: string;
  };
}

interface ArtistModalProps {
  artist: Artist;
  artworks: Artwork[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtistModal({
  artist,
  artworks,
  isOpen,
  onClose
}: ArtistModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const links = artist.links || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-gray-900/80 hover:bg-gray-800/80 text-white rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm"
            aria-label={t('artistas.cerrar')}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
            <div className="p-8 md:p-12 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-purple-500/20 flex items-center justify-center border-2 border-yellow-500/30">
                    {artist.avatar_url ? (
                      <img
                        src={artist.avatar_url}
                        alt={artist.nombre}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    ) : (
                      <Palette className="w-16 h-16 text-yellow-400" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full border-4 border-black"></div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {artist.nombre}
                    </h2>
                    <p className="text-xl text-yellow-400 font-semibold mb-4">
                      {artist.rol}
                    </p>
                    <p className="text-gray-300 leading-relaxed max-w-3xl">
                      {artist.statement}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {artist.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-yellow-500/10 to-purple-500/10 text-yellow-400 rounded-full border border-yellow-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(links.instagram || links.youtube || links.web) && (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {links.instagram && (
                        <a
                          href={links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-400 rounded-lg border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300"
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="text-sm font-semibold">Instagram</span>
                        </a>
                      )}
                      {links.youtube && (
                        <a
                          href={links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-400 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300"
                        >
                          <Youtube className="w-5 h-5" />
                          <span className="text-sm font-semibold">YouTube</span>
                        </a>
                      )}
                      {links.web && (
                        <a
                          href={links.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                        >
                          <Globe className="w-5 h-5" />
                          <span className="text-sm font-semibold">{t('artistas.sitioWeb')}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-yellow-500/20 pt-8">
                <h3 className="text-3xl font-bold text-white mb-6">
                  {t('artistas.portafolio')}
                </h3>

                {artworks.length === 0 ? (
                  <p className="text-gray-400 text-center py-12">
                    {t('artistas.noObrasDisponibles')}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {artworks.map((obra) => (
                      <ArtworkCard
                        key={obra.id}
                        titulo={obra.title}
                        tipo={obra.category}
                        anio={obra.year}
                        descripcion={obra.description}
                        categoria={obra.category}
                        videoUrl={obra.video_url}
                        thumbnailUrl={obra.thumbnail_url}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.5);
        }
      `}</style>
    </div>
  );
}
