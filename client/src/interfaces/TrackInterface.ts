export interface TrackInterface {
  id: string
  name: string
  duration: TrackDurationInterface
  trackNumber: number
  popularity: number
}

export interface TrackDurationInterface {
  ms: number
  timeString: string
}