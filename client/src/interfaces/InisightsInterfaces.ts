import type { TrackInterface } from "./TrackInterface"

export interface InsightsInterface {
  id: string
  name: string
  cover: string
  totalTracks: number
  time: {
    totalDuration: string
    averageDuration: string
    longestTrack: TrackInterface
    shortestTrack: TrackInterface
  }
  popularity: {
    average: number
    mostPopularTrack: TrackInterface
    leastPopularTrack: TrackInterface
  }
}
