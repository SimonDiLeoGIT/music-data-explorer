import { useEffect, useState } from "react";
import type { TrackInterface } from "../../../interfaces/MusicInterfaces";
import { musicService } from "../../../services/music.service";

interface Props {
  albumId: string
}

const Tracks: React.FC<Props> = ({ albumId }) => {
  const [tracksDetails, setTracksDetails] = useState<TrackInterface[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
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

  return (
    <section className="bg-zinc-800/50 p-4 rounded-b-md">
      <h2 className="text-zinc-100 text-2xl font-semibold mb-4">Tracks</h2>
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
    </section>
  )
}

export default Tracks;