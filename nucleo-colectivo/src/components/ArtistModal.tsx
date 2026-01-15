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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-7xl max-h-[92vh] animate-in zoom-in-95 duration-500">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-75 blur-2xl animate-pulse"></div>

        <div className="relative bg-black/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl shadow-yellow-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-yellow-500/20 via-purple-500/10 to-transparent pointer-events-none"></div>

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-4 bg-black/60 hover:bg-black/80 text-white rounded-2xl border border-yellow-500/40 hover:border-yellow-400/80 transition-all duration-500 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 hover:scale-110 group"
            aria-label={t('artistas.cerrar')}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <div className="overflow-y-auto max-h-[92vh] custom-scrollbar">
            <div className="p-10 md:p-16 space-y-12">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="relative group/avatar">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-75 blur-xl group-hover/avatar:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative w-40 h-40 rounded-[2rem] bg-gradient-to-br from-yellow-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 shadow-2xl">
                    {artist.avatar_url ? (
                      <img
                        src={artist.avatar_url}
                        alt={artist.nombre}
                        className="w-full h-full object-cover rounded-[2rem]"
                      />
                    ) : (
                      <Palette className="w-20 h-20 text-yellow-400 drop-shadow-2xl" />
                    )}
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 rounded-full border-4 border-black shadow-2xl shadow-yellow-500/50"></div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-400 to-purple-400 mb-4 drop-shadow-2xl leading-tight">
                      {artist.nombre}
                    </h2>
                    <p className="text-2xl text-yellow-400 font-bold mb-6 drop-shadow-lg">
                      {artist.rol}
                    </p>
                    <p className="text-gray-200 text-lg leading-relaxed max-w-4xl">
                      {artist.statement}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {artist.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-5 py-3 text-sm font-bold bg-white/10 backdrop-blur-sm text-yellow-400 rounded-full border border-yellow-500/40 shadow-lg hover:scale-105 hover:border-yellow-400/70 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(links.instagram || links.youtube || links.web) && (
                    <div className="flex flex-wrap gap-4 pt-6">
                      {links.instagram && (
                        <a
                          href={links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/40 hover:to-purple-500/40 backdrop-blur-sm text-pink-400 rounded-xl border border-pink-500/40 hover:border-pink-400/70 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105"
                        >
                          <Instagram className="w-6 h-6 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-bold">Instagram</span>
                        </a>
                      )}
                      {links.youtube && (
                        <a
                          href={links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 backdrop-blur-sm text-red-400 rounded-xl border border-red-500/40 hover:border-red-400/70 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105"
                        >
                          <Youtube className="w-6 h-6 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-bold">YouTube</span>
                        </a>
                      )}
                      {links.web && (
                        <a
                          href={links.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 backdrop-blur-sm text-blue-400 rounded-xl border border-blue-500/40 hover:border-blue-400/70 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
                        >
                          <Globe className="w-6 h-6 group-hover/link:scale-110 transition-transform duration-300" />
                          <span className="text-sm font-bold">{t('artistas.sitioWeb')}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-yellow-500/30 pt-12 mt-8">
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 mb-8 drop-shadow-lg">
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
