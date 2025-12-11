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
import ExplicitTracksSkeleton from "../../components/Skeleton/ExplicitTracksSkeleton";
import { formatNumber, formatNumberWithCommas } from "../../utils/formatNumbers";

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
    <main className='p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto'>
      {
        loading || !playlist ?
        <PlaylistHeaderSkeleton />
        :
        <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
          {
            playlist.cover &&
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
              style={{ backgroundImage: `url(${playlist.cover})` }}
            />
          }
          <section className="flex flex-col md:flex-row relative z-10">
            <img src={playlist.cover} alt="Album Cover" className="w-64 h-64 rounded mx-auto md:mx-0"/>
            <div className="flex flex-col justify-end center m-auto mb-0  md:ml-4 mt-4 md:mt-0 text-zinc-100 font-semibold gap-2 text-center md:text-left">
              <p className="text-sm">Album</p>
              <p className="text-3xl md:text-5xl">{playlist.name}</p>
            </div>
          </section>
          <section className="relative md:absolute top-0 right-0 p-4 grid grid-cols-2 gap-4 z-50 mt-4 md:mt-0">
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Songs</h2>
              {
                playlist.totalTracks &&
                <p 
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={formatNumberWithCommas(playlist.totalTracks)}
                >
                  {formatNumber(playlist.totalTracks)}
                </p>
              }
            </article>
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Duration</h2>
              {
                insights?.time?.totalDuration ?
                <p 
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={insights.time.totalDuration}
                >
                  {insights.time.totalDuration}
                </p>
                :
                <p className="font-semibold text-2xl text-purple-400 m-auto text-center">0h 00m</p>
              }
            </article>
          </section>
        </header>
      }
      {
        loading || !insights ?
        <PlaylistCardsSkeleton />
        : 
        <PlaylistCards insights={insights} />
      }
      <section className="grid md:grid-cols-2 gap-4 bg-zinc-900 p-4 rounded-b-md">
        {
          id &&
          <TopArtists playlistId={id} />
        }
        { 
          loading || !playlist || !insights ?
          <ExplicitTracksSkeleton />
          :
          <ExplicitTracks
            totalTracks={playlist.totalTracks}
            explicitTracks={insights.explicitTracks}
          />
        }
      </section>
      {
        id &&
        <TopTracks topTracks={topTracks} />
      }
    </main>
  )
}

export default Playlist;