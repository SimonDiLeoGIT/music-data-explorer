import { useEffect, useState } from "react";
import type { TrackInterface } from "../../../interfaces/TrackInterface";
import { musicService } from "../../../services/music.service";
import BarChart from "../../../components/BarChart";

interface Props {
  albumId: string
}

const Tracks: React.FC<Props> = ({ albumId }) => {
  const [tracksDetails, setTracksDetails] = useState<TrackInterface[]>([]);
  const [sortBy, setSortBy] = useState<string>("trackNumber"); // Valor inicial
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchData = async () => {
    const data = await musicService.getTrackDetails(albumId, sortBy, sortOrder);
    setTracksDetails(data);
  }
  
  useEffect(() => {
    fetchData();
  }, [albumId, sortBy, sortOrder])

  const handleSort = (criteria: string) => {
    let newSortOrder: "asc" | "desc" = "desc";
    if (sortBy === criteria) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortBy(criteria);
    setSortOrder(newSortOrder);
  }

  // Charts ordered lists
  const tracksByDuration = [...tracksDetails].sort((a, b) => b.duration.ms - a.duration.ms);
  const tracksByPopularity = [...tracksDetails].sort((a, b) => b.popularity - a.popularity);

  return (
    <section className="bg-zinc-800/50 p-4 rounded-b-md">
      <h2 className="text-zinc-100 text-2xl font-semibold mb-4">Tracks</h2>
      <div className="grid grid-cols-2 gap-4 h-[400px] p-4">
        <div className="h-full">
          <BarChart 
            data={{
              labels: tracksByDuration.map((track) => 
                track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name
              ),
              datasets: [{
                label: "Tracks Duration",
                data: tracksByDuration.map((track) => track.duration.ms),
                backgroundColor: "rgba(168, 85, 247, 0.3)",
                borderColor: "rgba(168, 85, 247, 1)",
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
              }],
              xTitle: "Duration (ms)",
              yTitle: "Tracks"
            }}
            horizontal
            onClick={() => {}}
          />
        </div>
        <div className="h-full">
          <BarChart 
            data={{
              labels: tracksByPopularity.map((track) => 
                track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name
              ),
              datasets: [{
                label: "Tracks Popularity",
                data: tracksByPopularity.map((track) => track.popularity),
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                borderColor: "rgba(34, 197, 94, 1)",
                borderWidth: 1,
                borderRadius: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
              }],
              xTitle: "Tracks",
              yTitle: "Popularity"
            }}
            horizontal={false}
            onClick={() => {}}
          />
        </div>
      </div>
      <ul className="text-zinc-100 p-2">
        <li className="grid grid-cols-4 gap-4 p-2 py-4 font-semibold border-b border-zinc-700/50">
          <span className="flex gap-2 col-span-2">
            <button 
              onClick={() => handleSort("trackNumber")}
              className="hover:text-purple-400"
            >
              # {sortBy === "trackNumber" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
            <button 
              onClick={() => handleSort("name")}
              className="hover:text-purple-400"
            >
              Title {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </button>
          </span>
          <button 
            className="text-end hover:text-purple-400" 
            onClick={() => handleSort("popularity")}
          >
            Popularity {sortBy === "popularity" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button 
            className="text-end hover:text-purple-400" 
            onClick={() => handleSort("duration")}
          >
            Duration {sortBy === "duration" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </li>
        {tracksDetails.map((track) => (
          <li key={track.trackNumber} className="grid grid-cols-4 gap-2 p-2 py-4 border-b border-zinc-700/20 hover:bg-zinc-700/30">
            <span className="flex gap-2 col-span-2">
              <span className="text-zinc-400">{track.trackNumber}</span>
              <span>{track.name}</span>
            </span>
            <span className="text-zinc-400 text-end">{track.popularity}</span>
            <span className="text-zinc-400 text-end">{track.duration.timeString}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}


export default Tracks;