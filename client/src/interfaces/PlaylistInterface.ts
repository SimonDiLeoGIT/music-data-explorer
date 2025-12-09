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

export interface PlaylistTopArtistsInterface {
  mostListenedArtists: TopArtistsInterface[]
  mostPlayedArtists: TopArtistsInterface[]
}

export interface TopArtistsInterface {
  id: string
  name: string
  image: string
  listeners: number
  playcount: number
}