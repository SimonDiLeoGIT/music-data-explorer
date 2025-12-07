export interface GenderInterface {
  name: string;
  count: number;
}

export interface TopGenderTagInterface {
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