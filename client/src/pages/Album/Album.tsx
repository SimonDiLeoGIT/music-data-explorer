import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { AlbumInsightsInterface } from "../../interfaces/MusicInterfaces";
import Tracks from "./components/Tracks";
import { useParams } from "react-router-dom";
import AlbumCards from "./components/AlbumCards";


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
            <p className="text-sm">{insights?.artist} <span className="text-zinc-400">&bull; {insights?.releaseDate} &bull; {insights?.totalTracks} songs, {insights?.totalDuration}</span></p>
          </div>
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
    </main>
  )
}

export default Album;