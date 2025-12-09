import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { AlbumInterface } from "../../interfaces/AlbumInteface";
import { useParams } from "react-router-dom";
import ArtistData from "./components/ArtistData";
import { ArtistDataSkeleton, PlaylistCardsSkeleton, PlaylistHeaderSkeleton } from "../../components/Skeleton/PlaylistSkeleton";
import { formatNumber, formatNumberWithCommas } from "../../utils/formatNumbers";
import PlaylistCards from "../../components/Insights/PlaylistCards";
import TopTracks from "../../components/Insights/TopTracks";
import type { TopTracksInterface } from "../../interfaces/TrackInterface";
import type { InsightsInterface } from "../../interfaces/InisightsInterfaces";
import ExplicitTracks from "../../components/Insights/ExplicitTracks";

const Album = () => {

  const { id } = useParams();

  const [album, setAlbum] = useState<AlbumInterface|null>(null);
  const [insights, setInsights] = useState<InsightsInterface|null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksInterface|null>(null);
  const [loading, setLoading] = useState(true);

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

  return( 
    <main className='p-8 py-4 w-11/12 max-w-[1600px] mx-auto'>
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
          <section className="flex relative z-10">
            <img src={album?.cover} alt="Album Cover" className="w-64 h-64 rounded"/>
            <div className="m-auto mb-0 ml-4 text-zinc-100 font-semibold flex flex-col gap-2">
              <p className="text-sm">Album</p>
              <p className="text-5xl">{album?.name}</p>
              <p className="text-sm">{album?.artist.name} 
                <span className="text-zinc-400">
                  &bull; {album?.releaseDate} &bull; {album?.totalTracks} songs, {insights?.time?.totalDuration}
                </span>
              </p>
            </div>
          </section>
          <section className="absolute bottom-0 right-0 p-4 grid grid-cols-2 gap-4 z-50">
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
        id &&
        <TopTracks topTracks={topTracks} />
      }
      { 
        !loading && album && insights &&
        <ExplicitTracks
          totalTracks={album.totalTracks}
          explicitTracks={insights.explicitTracks}
        />
      }
    </main>
  )
}

export default Album;