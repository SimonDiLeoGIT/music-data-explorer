import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { AlbumInsightsInterface } from "../../interfaces/AlbumInteface";
import Tracks from "./components/Tracks";
import { useParams } from "react-router-dom";
import AlbumCards from "./components/AlbumCards";
import ArtistData from "./components/ArtistData";


function Album() {

  const { id } = useParams();

  const [insights, setInsights] = useState<AlbumInsightsInterface|null>(null);

  const fetchData = async () => {
    if (!id) return;
    const data =  await musicService.getAlbumInsights(id);
    setInsights(data);
  }

  useEffect(() => {
    fetchData();
  }, [id])

  return( 
    <main className='p-8 w-11/12 max-w-[1600px] mx-auto'>
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
            <p className="text-sm">{insights?.artist.name} <span className="text-zinc-400">&bull; {insights?.releaseDate} &bull; {insights?.totalTracks} songs, {insights?.totalDuration}</span></p>
          </div>
        </section>
        <section className="absolute bottom-4 right-4 grid grid-cols-2 gap-4 z-50">
          <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-center">Listeners</h2>
            <p className="font-semibold text-2xl text-purple-400 m-auto text-center">{insights?.stats.listeners}</p>
          </article>
          <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center">
            <h2 className="text-lg font-semibold text-center">Plays</h2>
            <p className="font-semibold text-2xl text-purple-400 m-auto text-center">{insights?.stats.playcount}</p>
          </article>
       </section>
      </header>
      {
        insights &&
        <AlbumCards insights={insights} />
      }
      {
        id && 
        <Tracks albumId={id} />
      }
      {
        insights &&
        <ArtistData artist={insights?.artist} />
      }
    </main>
  )
}

export default Album;