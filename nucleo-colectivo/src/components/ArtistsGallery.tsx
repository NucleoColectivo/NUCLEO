import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

interface Artist {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  disciplines: string[];
  profile_image?: string;
  instagram_url?: string;
  youtube_url?: string;
  website_url?: string;
  featured: boolean;
  order_index: number;
}

interface Artwork {
  id: string;
  member_id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  year: number;
  video_url?: string;
  thumbnail_url?: string;
  featured: boolean;
  order_index: number;
}

export default function ArtistsGallery() {
  const { t, language } = useLanguage();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artworks, setArtworks] = useState<Record<string, Artwork[]>>({});
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loadArtists = async () => {
    setLoading(false);
  };

  const handleViewPortfolio = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtist(null), 300);
  };

  const transformArtistForModal = (artist: Artist) => ({
    id: artist.id,
    nombre: artist.name,
    rol: artist.role,
    statement: artist.bio,
    tags: artist.disciplines || [],
    avatar_url: artist.profile_image,
    links: {
      instagram: artist.instagram_url,
      youtube: artist.youtube_url,
      web: artist.website_url
    }
  });

  if (loading) {
    return (
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
            <p className="text-gray-400">
              {t('artistas.cargando')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-red-400">
              {t('artistas.errorCargar')}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="portafolios"
        className="relative py-32 bg-black overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,179,8,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        </div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-8">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-full border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
              <Users className="w-7 h-7 text-yellow-400 drop-shadow-lg" />
              <span className="text-yellow-400 font-bold tracking-wider text-lg uppercase">
                {t('artistas.nuestrosArtistas')}
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="text-white drop-shadow-2xl">
                {t('artistas.vitrinaDe')}{' '}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-gradient">
                {t('artistas.creadores')}
              </span>
            </h2>

            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              {t('artistas.conoceArtistas')}
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
              <div className="h-px w-32 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>
          </div>

          {artists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {t('artistas.noDisponibles')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  nombre={artist.name}
                  rol={artist.role}
                  tags={artist.disciplines || []}
                  avatarUrl={artist.profile_image}
                  onViewPortfolio={() => handleViewPortfolio(artist)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedArtist && (
        <ArtistModal
          artist={transformArtistForModal(selectedArtist)}
          artworks={artworks[selectedArtist.id] || []}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
