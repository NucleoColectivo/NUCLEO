import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { createClient } from '@supabase/supabase-js';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Artist {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  disciplines: string[];
  profile_image?: string;
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
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: artistsData, error: artistsError } = await supabase
        .from('members')
        .select('*')
        .order('order_index', { ascending: true });

      if (artistsError) throw artistsError;

      if (artistsData && artistsData.length > 0) {
        setArtists(artistsData);

        const artistIds = artistsData.map((a) => a.id);
        const { data: artworksData, error: artworksError } = await supabase
          .from('artworks')
          .select('*')
          .in('member_id', artistIds)
          .order('order_index', { ascending: true });

        if (artworksError) throw artworksError;

        if (artworksData) {
          const groupedArtworks: Record<string, Artwork[]> = {};
          artworksData.forEach((artwork) => {
            if (!groupedArtworks[artwork.member_id]) {
              groupedArtworks[artwork.member_id] = [];
            }
            groupedArtworks[artwork.member_id].push(artwork);
          });
          setArtworks(groupedArtworks);
        }
      }
    } catch (err) {
      console.error('Error loading artists:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
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
    links: {}
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
        className="relative py-24 bg-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 rounded-full border border-yellow-500/20">
              <Users className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                {t('artistas.nuestrosArtistas')}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="text-white">
                {t('artistas.vitrinaDe')}{' '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                {t('artistas.creadores')}
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('artistas.conoceArtistas')}
            </p>
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
