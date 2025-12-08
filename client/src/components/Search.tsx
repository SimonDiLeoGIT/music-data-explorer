import { useEffect, useState } from "react";
import { musicService } from "../services/music.service";
import type { AlbumSearchResultInterface } from "../interfaces/AlbumInteface";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Search = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AlbumSearchResultInterface[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
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
    setResults([]);
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
                {results?.map((result) => (
                  <Link 
                    to={`/albums/${result?.id}`} 
                    onClick={handleSelect}
                    key={result?.id} 
                    className="flex gap-2 font-semibold text-sm hover:bg-zinc-700/80 p-2 rounded-md hover:cursor-pointer"
                  >
                    <img src={result?.cover[0].url} alt="Album Cover" className="w-12 h-12 rounded"/>
                    <div className="m-auto ml-0 space-y-1">
                      <p>{result?.name}</p>
                      <p className="text-zinc-400">{result?.artist}</p>
                    </div>
                  </Link>
                ))}
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