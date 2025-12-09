import type { TrackInterface } from "./TrackInterface";

export interface PlaylistInterface {
  id: string
  name: string
  cover: string
  totalTracks: number
}

export interface PlaylistTrackInterface extends TrackInterface {
  album: {
    id: string
    name: string
    cover: string
  }
  artist: {
    id: string
    name: string
  }
}

export interface PlaylistArtistsFrequencyInterface {
  artistsFrequency: ArtistsFrequencyInterface[]
  totalArtists: number
}

interface ArtistsFrequencyInterface {
  id: string
  name: string
  count: number
}
