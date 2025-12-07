import { useEffect, useState } from "react";
import { musicService } from "../../../services/music.service";
import type { GenderInterface, TopGenderTagInterface } from "../../../interfaces/GenderInterface";
import { FaExternalLinkAlt } from "react-icons/fa";
import BarChart from "../../../components/BarChart";

const GendersInsights = () => {

  const [topGenders, setTopGenders] = useState<GenderInterface[]>([]);
  const [currentGender, setCurrentGender] = useState<string>('');
  const [genderArtists, setGenderArtists] = useState<TopGenderTagInterface[]>([]);
  const [genderTracks, setGenderTracks] = useState<TopGenderTagInterface[]>([]);
  const [genderAlbums, setGenderAlbums] = useState<TopGenderTagInterface[]>([]);

  useEffect(() => {
    const fetchTopGenders = async () => {
      const data = await musicService.getTopGenders();
      setTopGenders(data);
      if (data.length > 0) {
        setCurrentGender(data[0].name);
      }
    }
    fetchTopGenders();
  }, [])

  useEffect(() => {
    if (!currentGender) return;
    
    const fetchGenderArtists = async () => {
      const data = await musicService.getTopGenderArtists(currentGender);
      setGenderArtists(data);
    }
    
    fetchGenderArtists();
  }, [currentGender])

  useEffect(() => {
    if (!currentGender) return;
    
    const fetchGenderTracks = async () => {
      const data = await musicService.getTopGenderTracks(currentGender);
      setGenderTracks(data);
    }
    
    fetchGenderTracks();
  }, [currentGender])

  useEffect(() => {
    if (!currentGender) return;
    
    const fetchGenderAlbums = async () => {
      const data = await musicService.getTopGenderAlbums(currentGender);
      setGenderAlbums(data);
    }
    
    fetchGenderAlbums();
  }, [currentGender])

  return (
    <section className="mt-4">
      <h2 className="text-zinc-100 text-2xl font-bold">Genders Insights</h2>
      <div className="mt-4 bg-zinc-900 p-4 rounded-md">
        <div className="flex gap-4">
          <div className="w-2/3 h-[500px]">
            {
              topGenders.length > 0 &&
              <BarChart 
                data={{
                  labels: topGenders.map((gender) => gender.name),
                  datasets: [
                    {
                      label: 'Genders',
                      data: topGenders.map((gender) => gender.count),
                      backgroundColor: 'rgba(220, 30, 220, 0.3)',
                      borderColor: 'rgba(220, 30, 220, 1)',
                      borderWidth: 1,
                      borderRadius: 2,
                      barPercentage: 0.9,
                      categoryPercentage: 1.0,
                    },
                  ],
                  xTitle: 'Genders',
                  yTitle: 'Users Taggings',
                }}
                horizontal={false}
                onClick={(gender) => setCurrentGender(gender)}
              />
            }
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
              <TopCard top={genderArtists[0]} model="Artist" />
              <TopCard top={genderTracks[0]} model="Track" />
              <TopCard top={genderAlbums[0]} model="Album" />
          </div>
        </div>
        <p className="text-zinc-400 text-xs mt-2">Click on a gender bar to see the top artists, tracks and albums</p>
        <div className="grid grid-cols-3 gap-4 mt-4 bg-zinc-900 p-4 rounded-md">
            <TopFiveCards topFive={genderArtists} model="Artist" currentGender={currentGender} />
            <TopFiveCards topFive={genderAlbums} model="Album" currentGender={currentGender} />
            <TopFiveCards topFive={genderTracks} model="Track" currentGender={currentGender} />
        </div>
      </div>
    </section>
  )
}

const TopFiveCards: React.FC<{ topFive: TopGenderTagInterface[], model: string, currentGender: string}> = ({ topFive, model, currentGender }) => {
  // Asegurar que siempre haya 5 elementos
  const displayTopFive = Array.from({ length: 5 }, (_, index) => topFive[index] || null);
  
  return (
    <div className="flex-1">
      <h3 className="text-zinc-100 text-lg font-bold mb-2">
        Top {model} <span className="text-zinc-400 text-sm font-semibold">{currentGender}</span>
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

const TopCard: React.FC<{ top: TopGenderTagInterface, model: string}> = ({ top, model }) => {
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

export default GendersInsights;