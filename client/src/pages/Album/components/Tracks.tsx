import { useEffect, useState } from "react";
import type { TrackInterface } from "../../../interfaces/MusicInterfaces";
import { getTrackDetails } from "../../../services/music.service";

interface Props {
  list: string
}

const Tracks: React.FC<Props> = ({ list }) => {
  const [tracksDetails, setTracksDetails] = useState<TrackInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackDetails(list);
      setTracksDetails(data);
    }
    fetchData();
  }, [list])

  return (
    <ul className="text-zinc-100 p-2">
      <li className="grid grid-cols-4 gap-4 p-2">
          <span className="flex gap-2 col-span-2">
            <span>#</span>
            <span>Title</span>
          </span>
          <span className="text-end">Popularity</span>
          <span className="text-end">Duration</span>
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