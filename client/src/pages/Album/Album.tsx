import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { AlbumInterface } from "../../interfaces/AlbumInteface";
import { Link, useParams } from "react-router-dom";
import ArtistData from "./components/ArtistData";
import { ArtistDataSkeleton, PlaylistCardsSkeleton, PlaylistHeaderSkeleton } from "../../components/Skeleton/PlaylistSkeleton";
import { formatNumber, formatNumberWithCommas } from "../../utils/formatNumbers";
import PlaylistCards from "../../components/Insights/PlaylistCards";
import TopTracks from "../../components/Insights/TopTracks";
import type { TopTracksInterface } from "../../interfaces/TrackInterface";
import type { InsightsInterface } from "../../interfaces/InisightsInterfaces";
import ExplicitTracks from "../../components/Insights/ExplicitTracks";
import ExplicitTracksSkeleton from "../../components/Skeleton/ExplicitTracksSkeleton";
import { FaFilePdf, FaSpinner } from "react-icons/fa";

const Album = () => {

  const { id } = useParams();

  const [album, setAlbum] = useState<AlbumInterface|null>(null);
  const [insights, setInsights] = useState<InsightsInterface|null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksInterface|null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    document.title = "Album | MDE";
  }, []);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getAlbumData(id);
      setAlbum(data);
    } finally {
      setLoading(false);
    }
  }
  
  const fetchInsights = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getAlbumInsights(id);
      setInsights(data);
    } finally {
      setLoading(false);
    }
  }

  const fetchTopTracks = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getAlbumTopTracks(id);
      setTopTracks(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    fetchInsights();
    fetchTopTracks();
  }, [id])

  const handleExportPDF = async () => {
    if (!album || !insights || !topTracks || !id) return;
    
    setIsExporting(true);
    try {
      const response = await musicService.exportAlbumInsights(id, {
        album,
        insights,
        topTracks,
        artist: album.artist
      });
      
      // Crear un blob y descargarlo
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `album-${album.name}-report.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return( 
    <main className='p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto'>
      {
        loading || !album ?
        <PlaylistHeaderSkeleton />
        :
        <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
          {
            album?.cover &&
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
              style={{ backgroundImage: `url(${album?.cover})` }}
            />
          }
          <section className="flex flex-col md:flex-row relative z-10">
            <img src={album?.cover} alt="Album Cover" className="w-64 h-64 rounded mx-auto md:mx-0"/>
            <div className="flex flex-col justify-end center m-auto mb-0  md:ml-4 mt-4 md:mt-0 text-zinc-100 font-semibold gap-2 text-center md:text-left">
              <p className="text-sm">Album</p>
              <p className="text-3xl md:text-5xl">{album?.name}</p>
              <p className="text-sm">
                <Link to={`/artists/${album?.artist.id}`} className="hover:underline">{album?.artist.name}</Link>
                <span className="text-zinc-400"> &bull; {album?.releaseDate} &bull; {album?.totalTracks} songs, {insights?.time?.totalDuration}</span>
              </p>
            </div>
          </section>
          <section className="relative md:absolute top-0 right-0 p-4 grid grid-cols-2 gap-4 z-50 mt-4 md:mt-0">
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Listeners</h2>
              {
                album?.stats.listeners &&
                <p 
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={formatNumberWithCommas(album?.stats.listeners)}
                >
                  {formatNumber(album?.stats.listeners)}
                </p>
              }
            </article>
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Plays</h2>
              {
                album?.stats.playcount &&
                <p 
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={formatNumberWithCommas(album?.stats.playcount)}
                >
                  {formatNumber(album?.stats.playcount)}
                </p>
              }
            </article>
            <button
              onClick={handleExportPDF}
              disabled={loading || !insights || !topTracks || isExporting}
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
      }
      {
        loading || !album ?
        <ArtistDataSkeleton />
        :
        <ArtistData artist={album.artist} />
      }
      {
        loading || !insights ?
        <PlaylistCardsSkeleton />
        : 
        <PlaylistCards insights={insights} />
      }
      { 
        loading || !album || !insights ?
        <ExplicitTracksSkeleton />
        :
        <ExplicitTracks
          totalTracks={album.totalTracks}
          explicitTracks={insights.explicitTracks}
        />
      }
      {
        id &&
        <TopTracks topTracks={topTracks} />
      }
    </main>
  )
}

export default Album;