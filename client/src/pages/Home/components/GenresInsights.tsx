import { useEffect, useState } from "react";
import { musicService } from "../../../services/music.service";
import type { GenreInterface, TopGenreTagInterface } from "../../../interfaces/GenderInterface";
import { FaExternalLinkAlt } from "react-icons/fa";
import BarChart from "../../../components/BarChart";

const GenresInsights = () => {

  const [topGenres, setTopGenres] = useState<GenreInterface[]>([]);
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [genreArtists, setGenreArtists] = useState<TopGenreTagInterface[]>([]);
  const [genreTracks, setGenreTracks] = useState<TopGenreTagInterface[]>([]);
  const [genreAlbums, setGenreAlbums] = useState<TopGenreTagInterface[]>([]);

  useEffect(() => {
    const fetchTopGenres = async () => {
      const data = await musicService.getTopGenres();
      setTopGenres(data);
      if (data.length > 0) {
        setCurrentGenre(data[0].name);
      }
    }
    fetchTopGenres();
  }, [])

  useEffect(() => {
    if (!currentGenre) return;
    
    const fetchgenreArtists = async () => {
      const data = await musicService.getTopGenreArtists(currentGenre);
      setGenreArtists(data);
    }
    
    fetchgenreArtists();
  }, [currentGenre])

  useEffect(() => {
    if (!currentGenre) return;
    
    const fetchGenreTracks = async () => {
      const data = await musicService.getTopGenreTracks(currentGenre);
      setGenreTracks(data);
    }
    
    fetchGenreTracks();
  }, [currentGenre])

  useEffect(() => {
    if (!currentGenre) return;
    
    const fetchGenreAlbums = async () => {
      const data = await musicService.getTopGenreAlbums(currentGenre);
      setGenreAlbums(data);
    }
    
    fetchGenreAlbums();
  }, [currentGenre])

  return (
    <section className="mt-4">
      <h2 className="text-zinc-100 text-2xl font-bold">Genres Insights</h2>
      <div className="mt-4 bg-zinc-900 p-4 rounded-md">
        <div className="flex gap-4">
          <div className="w-2/3 h-[500px]">
            {
              topGenres.length > 0 &&
              <BarChart 
                data={{
                  labels: topGenres.map((genre) => genre.name),
                  datasets: [
                    {
                      label: 'Genres tagged by users',
                      data: topGenres.map((genre) => genre.count),
                      backgroundColor: 'rgba(220, 30, 220, 0.3)',
                      borderColor: 'rgba(220, 30, 220, 1)',
                      borderWidth: 1,
                      borderRadius: 2,
                      barPercentage: 0.9,
                      categoryPercentage: 1.0,
                    },
                  ],
                  xTitle: 'Genres',
                  yTitle: 'User Tagging',
                }}
                horizontal={false}
                onClick={(genre) => setCurrentGenre(genre)}
              />
            }
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
              <TopCard top={genreArtists[0]} model="Artist" />
              <TopCard top={genreTracks[0]} model="Track" />
              <TopCard top={genreAlbums[0]} model="Album" />
          </div>
        </div>
        <p className="text-zinc-400 text-xs mt-2">Click on a genre bar to see the top artists, tracks and albums</p>
        <div className="grid grid-cols-3 gap-4 mt-4 bg-zinc-900 p-4 rounded-md">
            <TopFiveCards topFive={genreArtists} model="Artist" currentGenre={currentGenre} />
            <TopFiveCards topFive={genreAlbums} model="Album" currentGenre={currentGenre} />
            <TopFiveCards topFive={genreTracks} model="Track" currentGenre={currentGenre} />
        </div>
      </div>
    </section>
  )
}

const TopFiveCards: React.FC<{ topFive: TopGenreTagInterface[], model: string, currentGenre: string}> = ({ topFive, model, currentGenre }) => {
  // Asegurar que siempre haya 5 elementos
  const displayTopFive = Array.from({ length: 5 }, (_, index) => topFive[index] || null);
  
  return (
    <div className="flex-1">
      <h3 className="text-zinc-100 text-lg font-bold mb-2">
        Top {model} <span className="text-zinc-400 text-sm font-semibold">{currentGenre}</span>
      </h3>
      <div className="mt-4">
        <ul className="space-y-2">
          {displayTopFive.map((top, index) => (
            <li 
              key={top?.name || `empty-${index}`} 
              className="text-zinc-400 flex gap-2 items-center bg-zinc-800/80 p-4 rounded-md w-full"
            >
              <p>#{index + 1}</p>
              {top ? (
                <>
                  <p>{top.name}</p>
                  <a 
                    href={top.apiUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="m-auto mr-0 justify-self-end hover:cursor-pointer"
                  >
                    <FaExternalLinkAlt className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300" />
                  </a>
                </>
              ) : (
                <p className="text-zinc-600">-</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const TopCard: React.FC<{ top: TopGenreTagInterface, model: string}> = ({ top, model }) => {
  return (
    <article className="flex gap-2 bg-zinc-700/80 p-2 rounded-md">
      <span className="h-full bg-purple-400 w-[1.5px]"></span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Top {model}</h2>
          {top ? (
          <div className="flex gap-2">
            <a href={top.apiUrl} target="_blank" rel="noreferrer" className="hover:cursor-pointer hover:underline">
              <p className="flex-1 text-sm">{top.name}</p>
            </a>
            {top.artist && (
              <>
                <p> &bull; </p>
                <a href={top.artist.apiUrl} target="_blank" rel="noreferrer" className="hover:cursor-pointer hover:underline">
                  <p className="flex-1 text-sm">{top.artist.name}</p>
                </a>
              </>
            )}
          </div>
        ) : (
          <p className="flex-1 text-sm text-zinc-400">-</p>
        )}
        </div>
    </article>
  )
}

export default GenresInsights;