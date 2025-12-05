import { useEffect, useState } from "react";
import type { TrackInterface } from "../../../interfaces/MusicInterfaces";
import { musicService } from "../../../services/music.service";

interface Props {
  list: string
}

const Tracks: React.FC<Props> = ({ list }) => {
  const [tracksDetails, setTracksDetails] = useState<TrackInterface[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchData = async () => {
    const data = await musicService.getTrackDetails(list, sortBy, sortOrder);
    setTracksDetails(data);
  }
  
  useEffect(() => {
    fetchData();
  }, [list, sortBy, sortOrder])

  const handleSort = (criteria: string) => {
    let newSortOrder: "asc" | "desc" = "desc";
    if (sortBy === criteria) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortBy(criteria);
    setSortOrder(newSortOrder);
  }

  return (
    <ul className="text-zinc-100 p-2">
      <li className="grid grid-cols-4 gap-4 p-2">
          <span className="flex gap-2 col-span-2">
            <button onClick={() => handleSort("truckNumber")}>#</button>
            <button onClick={() => handleSort("name")}>Title</button>
          </span>
          <button className="text-end" onClick={() => handleSort("popularity")}>Popularity</button>
          <button className="text-end" onClick={() => handleSort("duration")}>Duration</button>
      </li>
      {tracksDetails.map((track) => (
        <li key={track.trackNumber} className="grid grid-cols-4 gap-2 border-b border-zinc-700 p-2 ">
          <span className="flex gap-2 col-span-2">
            <span className="text-zinc-400">{track.trackNumber}</span>
            <span>{track.name}</span>
          </span>
          <span className="text-zinc-400 text-end">{track.popularity}</span>
          <span className="text-zinc-400 text-end">{track.duration.timeString}</span>
        </li>
      ))}
    </ul>
  )
}

export default Tracks;