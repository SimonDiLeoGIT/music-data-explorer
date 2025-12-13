import type { ArtistCompactInterface } from "./ArtistInterface"

export interface AlbumInterface {
  id: string
  name: string
  artist: ArtistCompactInterface
  releaseDate: string
  cover: string
  totalTracks: number
  popularity: number
  stats: {
    listeners: number
    playcount: number
  }
}

export interface NewReleaseInterface {
  id: string
  name: string
  artist: ArtistCompactInterface
  releaseDate: string
  cover: string
}