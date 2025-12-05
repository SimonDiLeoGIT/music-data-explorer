export interface AlbumInsightsInterface {
  id: string
  name: string
  artist: string
  releaseDate: string
  cover: AlbumCoverInterface[]
  totalTracks: number
  totalDuration: string
  averageDuration: TrackDurationInterface
  longestTrack: TrackInterface
  shortestTrack: TrackInterface
  popularity: AlbumsPopularityInsight
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
}

interface AlbumCoverInterface {
  url: string
  width: number
  height: number
}

interface TrackDurationInterface {
  ms: number
  timeString: string
}

export interface TrackInterface {
  id: string
  name: string
  duration: TrackDurationInterface
  trackNumber: number
  popularity: number
}

export interface AlbumsPopularityInsights {
  album: AlbumInterface
  tracks: TrackInterface[]
}