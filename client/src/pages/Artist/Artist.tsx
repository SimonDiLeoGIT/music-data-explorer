import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import { useParams } from "react-router-dom";
import { formatNumber, formatNumberWithCommas } from "../../utils/formatNumbers";
import AlbumSkeleton from "../../components/Skeleton/AlbumReleasesSkeleton";
import type { ArtistInterface } from "../../interfaces/ArtistInterface";
import { HtmlRenderer } from "../../components/HtmlRenderer";
import { Albums } from "./components/Albums";
import { TopTracks } from "./components/TopTracks";
import { ArtistHeaderSkeleton, BiographySkeleton, TopTracksSkeleton } from "../../components/Skeleton/ArtistSkeleton";
import { FaFilePdf, FaSpinner } from "react-icons/fa";


const Artist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState<ArtistInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    document.title = "Artist | MDE";
  }, []);

  const fetchArtistData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getArtistData(id);
      setArtist(data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const handleExportPDF = async () => {
    if (!artist || !id) return;
    
    setIsExporting(true);
    try {
      const response = await musicService.exportArtistInsights(id, {
        artist
      });
      
      // Crear un blob y descargarlo
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `artist-${artist.name}-report.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <main className="p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto">
        <ArtistHeaderSkeleton />
        <BiographySkeleton />
        <TopTracksSkeleton />
        <section>
          <h2 className="text-3xl text-zinc-100 font-bold mb-4">
            Albums
            <span className="text-zinc-400/70 text-xs">Discography</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) =>
              <AlbumSkeleton key={index} />
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto'>
      <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden mb-6">
        {artist?.image && (
          <div
            className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
            style={{ backgroundImage: `url(${artist?.image})` }}
          />
        )}
        <section className="flex flex-col md:flex-row relative z-10">
          <img
            src={artist?.image}
            alt={artist?.name}
            className="w-64 h-64 rounded-full mx-auto md:mx-0 object-cover"
          />
          <div className="flex flex-col justify-end m-auto mb-0  md:ml-4 mt-4 md:mt-0 text-zinc-100 font-semibold gap-2 text-center md:text-left">
            <p className="text-sm">Artist</p>
            <p className="text-5xl">{artist?.name}</p>
            <div className="flex gap-2 flex-wrap">
              {artist?.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="text-xs bg-purple-500/30 px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-zinc-400">
              Popularity: {artist?.popularity}/100
            </p>
          </div>
        </section>
        <section className="relative md:absolute top-0 right-0 p-4 grid grid-cols-2 gap-4 z-50 mt-4 md:mt-0">
          <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
            <h2 className="text-lg font-semibold text-center">Listeners</h2>
            {artist?.listeners ? (
              <p
                className="font-semibold text-2xl text-purple-400 m-auto text-center"
                title={formatNumberWithCommas(artist?.listeners)}
              >
                {formatNumber(artist?.listeners)}
              </p>
            ) : (
              <p className="text-zinc-400 text-center">N/A</p>
            )}
          </article>
          <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center shadow-md hover:cursor-default">
            <h2 className="text-lg font-semibold text-center">Plays</h2>
            {artist?.playcount ? (
              <p
                className="font-semibold text-2xl text-purple-400 m-auto text-center"
                title={formatNumberWithCommas(artist?.playcount)}
              >
                {formatNumber(artist?.playcount)}
              </p>
            ) : (
              <p className="text-zinc-400 text-center">N/A</p>
            )}
          </article>
          <button
            onClick={handleExportPDF}
            disabled={loading || !artist|| isExporting}
            className="hover:cursor-pointer col-span-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            {isExporting ? (
              <>
                <FaSpinner className="animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FaFilePdf />
                Export Report
              </>
            )}
          </button>
        </section>
      </header>

      {artist?.bio && (
        <section className="bg-zinc-800/50 p-6 rounded-md mb-6">
          <h2 className="text-2xl text-zinc-100 font-semibold mb-4">Biography</h2>
          <HtmlRenderer text={artist?.bio} />
        </section>
      )}

      {
        artist?.topTracks &&
        <TopTracks tracks={artist?.topTracks} />
      }

      {
        artist?.albums &&
        <Albums albums={artist?.albums} />
      }
    </main>
  );
};

export default Artist;