import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import type { GenreInterface, TopGenreTagInterface } from "../../interfaces/GenderInterface";
import BarChart from "../../components/charts/BarChart";
import { GenreTopSectionSkeleton, GenresInsightsSkeleton } from "../../components/Skeleton/GenresInsightsSkeleton";
import GenreTopSection from "./components/GenreTopSection";

const Genres = () => {

  const [topGenres, setTopGenres] = useState<GenreInterface[]>([]);
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [genreArtists, setGenreArtists] = useState<TopGenreTagInterface[]>([]);
  const [genreTracks, setGenreTracks] = useState<TopGenreTagInterface[]>([]);
  const [genreAlbums, setGenreAlbums] = useState<TopGenreTagInterface[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [isLoadingGenreData, setIsLoadingGenreData] = useState(true);

 useEffect(() => {
    const fetchTopGenres = async () => {
      setIsLoadingGenres(true);
      const data = await musicService.getTopGenres();
      setTopGenres(data);
      if (data.length > 0) {
        setCurrentGenre(data[0].name);
      }
      setIsLoadingGenres(false);
    }
    fetchTopGenres();
  }, [])

  useEffect(() => {
    if (!currentGenre) return;
    
    const fetchGenreData = async () => {
      setIsLoadingGenreData(true);
      
      const [artists, tracks, albums] = await Promise.all([
        musicService.getTopGenreArtists(currentGenre),
        musicService.getTopGenreTracks(currentGenre),
        musicService.getTopGenreAlbums(currentGenre)
      ]);
      
      setGenreArtists(artists);
      setGenreTracks(tracks);
      setGenreAlbums(albums);
      setIsLoadingGenreData(false);
    }
    
    fetchGenreData();
  }, [currentGenre])

  return (
    <main className='p-1 md:p-8 py-4 md:w-11/12 max-w-[1600px] mx-auto'>
      <h2 className="text-zinc-100 text-3xl font-bold">Genres Insights</h2>
      <div className="mt-4 bg-zinc-900 p-4 rounded-md">
      <p className="text-zinc-400 text-xs mt-2">Data sourced from Last.fm's top user-tagged genres</p>
        {isLoadingGenres ? (
          <GenresInsightsSkeleton />
        ) : (
          <div className="mt-6">
            <h3 className="text-zinc-300 text-sm font-semibold mb-4">Top Genres by User Tags</h3>
            <div className="gap-4">
              <div className="h-[500px]">
                {topGenres.length > 0 && (
                  <BarChart 
                    data={{
                      labels: topGenres.map((genre) => 
                        genre.name.length > 20 ? genre.name.substring(0, 10) + '...' : genre.name
                      ),
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
                )}
              </div>
            </div>
            <p className="text-zinc-400 text-xs mt-4">Click on a genre bar to see detailed statistics</p>
            {isLoadingGenreData ? (
              <div className="my-6">
                <GenreTopSectionSkeleton />
                <GenreTopSectionSkeleton />
                <GenreTopSectionSkeleton />
              </div>
            ) : (
              <>
                <GenreTopSection top={genreArtists} title="Artists" currentGenre={currentGenre} />
                <GenreTopSection top={genreAlbums} title="Albums" currentGenre={currentGenre} />
                <GenreTopSection top={genreTracks} title="Tracks" currentGenre={currentGenre} />
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Genres;