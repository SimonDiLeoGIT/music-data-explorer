import type { ArtistInterface } from "./ArtistInterface"
import type { InsightsInterface } from "./InisightsInterfaces"

export interface AlbumInsightsInterface extends InsightsInterface {
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
