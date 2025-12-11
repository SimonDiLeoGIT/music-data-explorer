export interface ArtistCompactInterface {
  id: string
  name: string,
  image: string
  listeners: number
  playcount: number
  bio: string
}

export interface ArtistInterface {
  id: string
  name: string,
  image: string
  popularity: number
  listeners: number
  playcount: number
  bio: string
  genres: string[]
  topTracks: TrackInterface[]
  albums: AlbumInterface[]
}

export interface TrackInterface {
  id: string
  name: string
  duration: string
  popularity: number
  album: {
    id: string
    name: string
    cover: string
  }
  explicit: boolean
}

export interface AlbumInterface {
  id: string
  name: string
  cover: string
  releaseDate: string
  totalTracks: number
} 