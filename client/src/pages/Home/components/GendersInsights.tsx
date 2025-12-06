import { useEffect, useState } from "react";
import { musicService } from "../../../services/music.service";
import type { GenderInterface, TopGenderTagInterface } from "../../../interfaces/GenderInterface";
import { Bar } from "react-chartjs-2";
import { FaExternalLinkAlt } from "react-icons/fa";
import * as Chart from 'chart.js';

Chart.Chart.register(...Chart.registerables);

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
        <div className="flex  gap-4">
          <div className="w-2/3">
          {
            topGenders.length > 0 &&
            <Bar
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
              }}
              options={{
                responsive: true,
                onClick: (event, elements) => {
                  if (elements.length > 0) {
                    const index = elements[0].index;
                    const clickedGender = topGenders[index];
                    setCurrentGender(clickedGender.name);
                  }
                },
                plugins: {
                  legend: {
                    display: true,
                  },
                  title: {
                    display: true,
                    text: 'Top Ten Genders',
                    color: 'rgb(244, 244, 245)',
                    font: {
                      size: 18
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'User Taggings',
                      color: 'rgb(244, 244, 245)',
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    },
                    ticks: {
                      color: 'rgb(212, 212, 216)'
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Genders',
                      color: 'rgb(244, 244, 245)',
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    },
                    ticks: {
                      color: 'rgb(212, 212, 216)'
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    }
                  }
                }
              }}
              />
            }
          </div>
          <section className="flex flex-col flex-1 gap-4 justify-center">
            <TopCard top={genderArtists[0]} model="Artist" />
            <TopCard top={genderAlbums[0]} model="Albums" />
            <TopCard top={genderTracks[0]} model="Tracks" />
          </section>
        </div>
        <p className="text-zinc-400 text-xs mt-2">Click on a gender bar to see the top artists, tracks and albums</p>
        <div className="grid grid-cols-3 gap-4 mt-4 bg-zinc-900 p-4 rounded-md">
          <div className="flex-1">
            <h3 className="text-zinc-100 text-lg font-bold mb-2">Top Artists <span className="text-zinc-400 text-sm font-semibold">{currentGender}</span></h3>
            {
              genderArtists.length > 0 &&
              <div className="mt-4">
                <ul className="space-y-2">
                  {
                    genderArtists.map((artist) => (
                      <li key={artist.name} className="text-zinc-400 flex gap-2 items-center bg-zinc-800/80 p-4 rounded-md w-full">
                        <p>#{artist.rank}</p>
                        <p>{artist.name}</p>
                        <a href={artist.apiUrl} target="_blank" rel="noreferrer" className="m-auto mr-0 justify-self-end hover:cursor-pointer">
                          <FaExternalLinkAlt className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300" />
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            }
          </div>
        <div className="flex-1">
          <h3 className="text-zinc-100 text-lg font-bold mb-2">Top Tracks <span className="text-zinc-400 text-sm font-semibold">{currentGender}</span></h3>
          {
            genderTracks.length > 0 &&
            <div className="mt-4">
              <ul className="space-y-2">
                {
                  genderTracks.map((track) => (
                    <li key={track.name} className="text-zinc-400 flex gap-2 items-center bg-zinc-800/80 p-4 rounded-md w-full">
                      <p>#{track.rank}</p>
                      <p>{track.name}</p>
                      <a href={track.apiUrl} target="_blank" rel="noreferrer" className="m-auto mr-0 justify-self-end hover:cursor-pointer">
                        <FaExternalLinkAlt className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300" />
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
        <div className="flex-1">
          <h3 className="text-zinc-100 text-lg font-bold mb-2">Top Albums <span className="text-zinc-400 text-sm font-semibold">{currentGender}</span></h3>
          {
            genderAlbums.length > 0 &&
            <div className="mt-4">
              <ul className="space-y-2">
                {
                  genderAlbums.map((album) => (
                    <li key={album.name} className="text-zinc-400 flex gap-2 items-center bg-zinc-800/80 p-4 rounded-md w-full">
                      <p>#{album.rank}</p>
                      <p>{album.name}</p>
                      <a href={album.apiUrl} target="_blank" rel="noreferrer" className="m-auto mr-0 justify-self-end hover:cursor-pointer">
                        <FaExternalLinkAlt className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300" />
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          </div>
        </div>
      </div>
    </section>
  )
}

const TopCard: React.FC<{ top: TopGenderTagInterface, model: string}> = ({ top, model }) => {
  return (
    <article className="flex gap-2 bg-zinc-700/80 p-2 rounded-md">
      <span className="h-full bg-purple-400 w-[1.5px]"></span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Top {model}</h2>
        <div className="flex gap-2">
          <a href={top?.apiUrl} target="_blank" rel="noreferrer" className="hover:cursor-pointer hover:underline">
            <p className="flex-1 text-sm">{top?.name}</p>
          </a>
          {
            top?.artist &&
            <>
              <p> &bull; </p>
              <a href={top?.artist?.apiUrl} target="_blank" rel="noreferrer" className="hover:cursor-pointer hover:underline">
                <p className="flex-1 text-sm">{top?.artist?.name}</p>
              </a>
            </>
          }
        </div>
      </div>
    </article>
  )
}

export default GendersInsights;