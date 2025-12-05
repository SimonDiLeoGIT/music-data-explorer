export interface AlbumInsightsInterface {
  albumId: string
  name: string
  artist: string
  releaseDate: string
  cover: AlbumCoverInterface[]
  trackCount: number
  totalDuration: TrackDurationInterface
  averageDuration: TrackDurationInterface
  longestTrack: TrackInterface
  shortestTrack: TrackInterface
  tracks: string[]
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
  name: string
  duration: TrackDurationInterface
  trackNumber: number
  popularity: number
}