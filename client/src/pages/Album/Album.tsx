import { useEffect, useState } from "react";
import { getAlbumInsights } from "../../services/music.service";
import type { AlbumInsightsInterface } from "../../interfaces/MusicInterfaces";
import Tracks from "./components/Tracks";


function Album() {

  const [insights, setInsights] = useState<AlbumInsightsInterface|null>(null);

  const fetchData = async () => {
    const data =  await getAlbumInsights();
    setInsights(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return( 
    <main className="p-8">
      <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
        {
          insights?.cover &&
          <div
            className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
            style={{ backgroundImage: `url(${insights?.cover[0].url})` }}
          />
        }
        <section className="flex relative z-10">
          <img src={insights?.cover[0].url} alt="Album Cover" className="w-64 h-64"/>
          <div className="m-auto mb-0 ml-4 text-zinc-100 font-semibold flex flex-col gap-2">
            <p className="text-sm">Album</p>
            <p className="text-5xl">{insights?.name}</p>
            <p className="text-sm">{insights?.artist} <span className="text-zinc-400">&bull; {insights?.releaseDate} &bull; {insights?.trackCount} songs, {insights?.totalDuration.timeString}</span></p>
          </div>
        </section>
      </header>
      <section className="bg-zinc-800/70 p-4 text-zinc-100 grid grid-cols-3 gap-2">
        <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
          <span className="h-full bg-purple-600 w-[1.5px]"></span>
          <div className="flex flex-col gap-1 w-full">
            <h2 className="text-lg text-purple-600 font-semibold">Longest Track</h2>
            <div className="flex gap-2 items-center">
              <p className="flex-1 text-sm">{insights?.longestTrack.name}</p>
              <p className="text-purple-400 justify-self-end px-2">{insights?.longestTrack.duration.timeString}</p>
            </div>
          </div>
        </article>
        <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
          <span className="h-full bg-purple-600 w-[1.5px]"></span>
          <div className="flex flex-col gap-1 w-full">
            <h2 className="text-lg text-purple-600 font-semibold">Shortest Track</h2>
            <div className="flex gap-2 items-center">
              <p className="flex-1 text-sm">{insights?.shortestTrack.name}</p>
              <p className="text-purple-400 justify-self-end px-2">{insights?.shortestTrack.duration.timeString}</p>
            </div>
          </div>
        </article>
      </section>
      <section className="bg-zinc-800/50 p-4 rounded-b-md">
        <h2 className="text-zinc-100 text-2xl font-semibold mb-4">Tracks</h2>
        {
          insights && 
          <Tracks list={insights.albumId} />
        }
      </section>
    </main>
  )
}

export default Album;