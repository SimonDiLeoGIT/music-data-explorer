import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { AlbumInterface } from "../../interfaces/AlbumInteface";
import { Link } from "react-router-dom";
import GenresInsights from "./components/GenresInsights";
import AlbumSkeleton from "../../components/Skeleton/AlbumReleasesSkeleton";

const Home = () => {

  const [newReleases, setNewReleases] = useState<AlbumInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNewReleases = async () => {
    const data =  await musicService.getNewReleases(6, 0);
    setNewReleases(data);
  }
  
  useEffect(() => {
    fetchNewReleases();
  }, [])

  useEffect(() => {
    if (newReleases.length > 0) {
      setLoading(false);
    }
  }, [newReleases])


  return (
    <main className='p-8 py-4 w-11/12 max-w-[1600px] mx-auto'>
      <h1 className="text-3xl text-zinc-100 font-bold mb-4">New Releases <span className="text-zinc-400/70 text-xs">Albums</span></h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {loading ? 
          Array.from({ length: 6 }).map((_, index) => (
            <AlbumSkeleton key={index} />
          ))
          :
          newReleases?.map((album) => (
            <div key={album.id} className="bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200">
              <Link to={`/albums/${album.id}`} >
                <img src={album.cover[0].url} alt={album.name} className="w-full h-auto"/>
              </Link>
              <div className="p-2">
                <h2 className="text-lg text-zinc-100 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                  title={album.name}
                >
                  {album.name}
                </h2>
                <p className="text-sm text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis" title={album.artist}>{album.artist}</p>
                <p className="text-sm text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis" title={album.releaseDate}>{album.releaseDate}</p>
              </div>
            </div>
          ))}
      </section>
      <div className="mt-8">
        <GenresInsights />
      </div>
    </main>
  );
}

export default Home;