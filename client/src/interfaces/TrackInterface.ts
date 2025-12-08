export interface TrackInterface {
  id: string
  name: string
  duration: TrackDurationInterface
  trackNumber: number
  popularity: number
  explicit: boolean
}

export interface TrackDurationInterface {
  ms: number
  timeString: string
}