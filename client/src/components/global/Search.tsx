import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import type { SearchResultInterface } from "../../interfaces/Search";

const Search = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultInterface|null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query])

  const fetchData = async () => {
    try {
      const data = await musicService.search(query);
      setResults(data);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  const handleSelect = () => {
    setQuery('');
    setResults(null);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div className="flex gap-2 items-center justify-center text-zinc-100">
        <Link to="/"
          className="rounded-full p-3 bg-zinc-800/80 hover:bg-zinc-700/80 hover:cursor-pointer"
        >
          <FaHome className="" />
        </Link>
        <div>
          <input 
            type="text"
            placeholder="Search..."
            className="p-2 px-4 rounded-full w-[460px] bg-zinc-800/80 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {
            isOpen && (
              <div className="absolute w-[460px] z-50 text-start bg-zinc-800 max-h-96 overflow-y-scroll p-2 mt-1.5 rounded-md shadow-md space-y-1">
                <div>
                  <p className="font-semibold text-sm p-2 border-b border-zinc-700/50">Albums</p>
                  {results?.albums.map((album) => (
                    <Link 
                    to={`/albums/${album?.id}`} 
                    onClick={handleSelect}
                      key={album?.id} 
                      className="flex gap-2 font-semibold text-sm hover:bg-zinc-700/80 p-2 rounded-md hover:cursor-pointer"
                    >
                      <img src={album?.cover} alt="Album Cover" className="w-12 h-12 rounded"/>
                      <div className="m-auto ml-0 space-y-1">
                        <p>{album.name}</p>
                        <p className="text-zinc-400">{album.artist}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-sm p-2 border-b border-zinc-700/50">Playlists</p>
                  {results?.playlists.map((playlist) => (
                    <Link 
                    to={`/playlists/${playlist?.id}`} 
                    onClick={handleSelect}
                      key={playlist?.id} 
                      className="flex gap-2 font-semibold text-sm hover:bg-zinc-700/80 p-2 rounded-md hover:cursor-pointer"
                    >
                      <img src={playlist?.cover} alt="Album Cover" className="w-12 h-12 rounded"/>
                      <div className="m-auto ml-0 space-y-1">
                        <p>{playlist.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-sm p-2 border-b border-zinc-700/50">Artists</p>
                  {results?.artists.map((artist) => (
                    <Link 
                      to={`/artists/${artist?.id}`} 
                      onClick={handleSelect}
                      key={artist?.id} 
                      className="flex gap-2 font-semibold text-sm hover:bg-zinc-700/80 p-2 rounded-md hover:cursor-pointer"
                    >
                      <img src={artist?.image} alt="Album Cover" className="w-12 h-12 rounded-full"/>
                      <div className="m-auto ml-0 space-y-1">
                        <p>{artist.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 top-20"
          onClick={handleSelect}
        />
      )}
    </div>
  )
}

export default Search;