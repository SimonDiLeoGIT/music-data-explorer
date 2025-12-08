import type { ArtisInterface } from "./ArtistInterface"
import type { TrackDurationInterface, TrackInterface } from "./TrackInterface"

export interface AlbumInsightsInterface {
  id: string
  name: string
  artist: ArtisInterface
  releaseDate: string
  cover: AlbumCoverInterface[]
  totalTracks: number
  totalDuration: string
  averageDuration: TrackDurationInterface
  longestTrack: TrackInterface
  shortestTrack: TrackInterface
  popularity: AlbumsPopularityInsight
  stats: {
    listeners: number
    playcount: number
  }
}

interface AlbumsPopularityInsight {
  average: number
  mostPopularTrack: TrackInterface
  leastPopularTrack: TrackInterface
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

export interface AlbumSearchResultInterface {
  id: string
  name: string
  artist: string
  cover: AlbumCoverInterface[]
}
