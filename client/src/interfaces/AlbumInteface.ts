import type { ArtistInterface } from "./ArtistInterface"
import type { InsightsInterface } from "./InisightsInterfaces"

export interface AlbumInsightsInterface extends InsightsInterface {
  id: string
  name: string
  cover: string
  totalTracks: number
  artist: ArtistInterface
  releaseDate: string
  stats: {
    listeners: number
    playcount: number
  }
}

export interface AlbumInterface {
  id: string
  name: string
  artist: string
  releaseDate: string
  cover: AlbumCoverInterface[]
  totalTracks: number
  popularity: number
}

interface AlbumCoverInterface {
  url: string
  width: number
  height: number
}
