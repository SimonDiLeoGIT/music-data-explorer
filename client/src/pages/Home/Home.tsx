import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { NewReleaseInterface } from "../../interfaces/AlbumInteface";
import { Link } from "react-router-dom";
import AlbumSkeleton from "../../components/Skeleton/AlbumReleasesSkeleton";

const Home = () => {

  const [newReleases, setNewReleases] = useState<NewReleaseInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Home | MDE";
  }, []);

  const fetchNewReleases = async () => {
    const data =  await musicService.getNewReleases();
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
    <main className='p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto'>
      <h1 className="text-3xl text-zinc-100 font-bold mb-4">New Releases <span className="text-zinc-400/70 text-xs">Albums</span></h1>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 min-w-[250px]">
        {loading ? 
          Array.from({ length: 12 }).map((_, index) => (
            <AlbumSkeleton key={index} />
          ))
          :
          newReleases?.map((album) => (
            <div key={album.id} className="bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200">
              <Link to={`/albums/${album.id}`} >
                <img src={album.cover} alt={album.name} className="w-full h-auto"/>
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
    </main>
  );
}

export default Home;