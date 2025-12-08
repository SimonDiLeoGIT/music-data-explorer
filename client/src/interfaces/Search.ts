export interface SearchResultInterface {
  albums: AlbumSearchResultInterface[];
  playlists: PlaylistSearchResultInterface[];
  artists: ArtistSearchResultInterface[];
}

interface AlbumSearchResultInterface {
  id: string
  name: string
  artist: string
  cover: string
}

interface PlaylistSearchResultInterface {
  id: string
  name: string
  cover: string
}

export interface ArtistSearchResultInterface {
  id: string
  name: string
  image: string
}