import type { ArtistInterface } from "./ArtistInterface"

export interface AlbumInterface {
  id: string
  name: string
  artist: ArtistInterface
  releaseDate: string
  cover: string
  totalTracks: number
  popularity: number
  stats: {
    listeners: number
    playcount: number
  }
}