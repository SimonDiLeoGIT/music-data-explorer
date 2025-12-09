import type { TrackInterface } from "./TrackInterface"

export interface InsightsInterface {
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
  explicitTracks: number
}
