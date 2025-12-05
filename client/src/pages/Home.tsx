import { useEffect, useState } from "react";
import { musicService } from "../services/music.service";
import type { AlbumInterface } from "../interfaces/MusicInterfaces";
import { Link } from "react-router-dom";

const Home = () => {

  const [newReleases, setNewReleases] = useState<AlbumInterface[]>([]);
  const [newReleasesInsights, setNewReleasesInsights] = useState<AlbumInterface[]>([]);

  const fetchNewReleases = async () => {
    const data =  await musicService.getNewReleases(6, 0);
    setNewReleases(data);
  }
  
  useEffect(() => {
    fetchNewReleases();
  }, [])

  const fetchNewReleasesInsights = async () => {
    const data =  await musicService.getNewReleasesInsights(newReleases.map((album) => album.id).join(','));
    setNewReleasesInsights(data);
  }
  
  useEffect(() => {
    if (newReleases.length > 0) {
      fetchNewReleasesInsights();
    }    
  }, [newReleases])

  return (
    <main className='p-4'>
      <h1 className="text-3xl text-zinc-100 font-semibold mb-4">New Releases</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {newReleases.map((album) => (
          <div key={album.id} className="bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200">
            <Link to={`/albums/${album.id}`} >
            <img src={album.cover[0].url} alt={album.name} className="w-full h-auto"/>
            </Link>
            <div className="p-2">
              <h2 className="text-lg text-zinc-100 font-semibold">{album.name}</h2>
              <p className="text-sm text-zinc-400">{album.artist}</p>
              <p className="text-sm text-zinc-400">{album.releaseDate}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;