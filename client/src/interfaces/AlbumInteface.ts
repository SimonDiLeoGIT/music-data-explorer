import type { ArtistInterface } from "./ArtistInterface"
import type { InsightsInterface } from "./InisightsInterfaces"

export interface AlbumInsightsInterface extends InsightsInterface {}

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