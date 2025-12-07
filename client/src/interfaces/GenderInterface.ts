export interface GenreInterface {
  name: string;
  count: number;
}

export interface TopGenreTagInterface {
  name: string;
  artist: {
    name: string;
    apiUrl: string;
  };
  apiUrl: string;
  rank: number;
  image: string;
  stats: {
    listeners: number;
    playcount: number;
  };
}