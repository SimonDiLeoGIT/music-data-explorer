import { useEffect, useState } from "react";
import type { TopArtistsInterface } from "../../../interfaces/PlaylistInterface";
import { musicService } from "../../../services/music.service";

interface Props {
  playlistId: string
}

const TopArtists: React.FC<Props> = ({ playlistId }) => {
  
  const [topArtists, setTopArtists] = useState<TopArtistsInterface|null>(null);

  const fetchTopArtists = async () => {
    try {
      const data = await musicService.getPlaylistTopArtists(playlistId);
      setTopArtists(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopArtists();
  }, [playlistId]);
  
  return (
    <>
    </>
  )
}

export default TopArtists