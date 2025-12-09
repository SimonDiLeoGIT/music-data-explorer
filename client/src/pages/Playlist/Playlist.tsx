import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import { useParams } from "react-router-dom";
import { PlaylistCardsSkeleton, PlaylistHeaderSkeleton } from "../../components/Skeleton/PlaylistSkeleton";
import type { PlaylistInterface } from "../../interfaces/PlaylistInterface";
import PlaylistCards from "../../components/Insights/PlaylistCards";
import type { TopTracksInterface } from "../../interfaces/TrackInterface";
import TopTracks from "../../components/Insights/TopTracks";
import type { InsightsInterface } from "../../interfaces/InisightsInterfaces";
import TopArtists from "./components/TopArtists";
import ExplicitTracks from "../../components/Insights/ExplicitTracks";

const Playlist = () => {

  const { id } = useParams();

  const [playlist, setPlaylist] = useState<PlaylistInterface|null>(null);
  const [insights, setInsights] = useState<InsightsInterface|null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksInterface|null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getPlaylistData(id);
      setPlaylist(data);
    } finally {
      setLoading(false);
    }
  }
  
  const fetchInsights = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getPlaylistInsights(id);
      setInsights(data);
    } finally {
      setLoading(false);
    }
  }

  const fetchTopTracks = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getPlaylistTopTracks(id);
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
        loading || !playlist ?
        <PlaylistHeaderSkeleton />
        :
        <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
          {
            playlist?.cover &&
            <div
            className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
            style={{ backgroundImage: `url(${playlist?.cover})` }}
            />
          }
          <section className="flex relative z-10">
            <img src={playlist?.cover} alt="Album Cover" className="w-64 h-64 rounded"/>
            <div className="m-auto mb-0 ml-4 text-zinc-100 font-semibold flex flex-col gap-2">
              <p className="text-sm">Playlist</p>
              <p className="text-5xl">{playlist?.name}</p>
            </div>
          </section>
          <section className="absolute bottom-0 right-0 p-4 grid grid-cols-2 gap-4 z-50">
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Songs</h2>
              {
                playlist?.totalTracks &&
                <p className="font-semibold text-2xl text-purple-400 m-auto text-center">
                  {playlist?.totalTracks}
                </p>
              }
            </article>
            {
              insights?.time.totalDuration ?
              <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center shadow-md hover:cursor-default">
                <h2 className="text-lg font-semibold text-center">Duration</h2>
                {
                  insights?.time.totalDuration &&
                  <p className="font-semibold text-2xl text-purple-400 m-auto text-center">
                    {insights?.time.totalDuration}
                  </p>
                }
              </article>
              :
              <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-2 shadow-md w-32">
                <div className="h-6 w-20 bg-zinc-600 rounded animate-pulse mx-auto" />
                <div className="h-8 w-16 bg-zinc-600 rounded animate-pulse mx-auto" />
              </article>
            }
        </section>
        </header>
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
      <section className="grid grid-cols-2 gap-4 bg-zinc-900 p-4 rounded-b-md">
        {
          id &&
          <TopArtists playlistId={id} />
        }
        { 
          playlist && insights &&
          <ExplicitTracks
            totalTracks={playlist.totalTracks}
            explicitTracks={insights.explicitTracks}
          />
        }
      </section>
    </main>
  )
}

export default Playlist;