import type { AlbumInterface } from '../interfaces/AlbumInteface';
import type { ArtistCompactInterface, ArtistInterface } from '../interfaces/ArtistInterface';
import type { GenreInterface, TopGenreTagInterface } from '../interfaces/GenderInterface';
import type { InsightsInterface } from '../interfaces/InisightsInterfaces';
import type { PlaylistInterface } from '../interfaces/PlaylistInterface';
import type { TopTracksInterface } from '../interfaces/TrackInterface';
import {downloadPDF, getRequest} from './api.service';

class MusicService {

  async getAlbumData(albumId: string) {
    return getRequest(`/albums/${albumId}`);
  }

  async getAlbumInsights(id: string) {
    try {
      const responseData = await getRequest(`/albums/${id}/insights`);
      return responseData;
    } catch (error) {
      console.error('Error fetching album insights:', error);
    }
  
  }

  async getAlbumTopTracks(albumId: string) {
    return getRequest(`/albums/${albumId}/top-tracks`);
  }
  
  async getAlbumTracks(albumId: string, sortBy?: string, sortOrder?: string) {
    try {
      const responseData = await getRequest(`/albums/${albumId}/tracks`, { sortBy, sortOrder });
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  async getNewReleases(limit: number = 12, offset: number = 0) {
    try {
      const responseData = await getRequest(`/albums/browse/new-releases`, { limit, offset });
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  async getTopGenres() {
    try {
      const responseData = await getRequest(`/genres/top-ten`);
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  async getTopGenreArtists(genreTag: string) {
    try {
      const responseData = await getRequest(`/genres/${genreTag}/top-artists`);
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }
 
  async getTopGenreTracks(genreTag: string) {
    try {
      const responseData = await getRequest(`/genres/${genreTag}/top-tracks`);
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }
 
  async getTopGenreAlbums(genreTag: string) {
    try {
      const responseData = await getRequest(`/genres/${genreTag}/top-albums`);
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  async search(query: string) {
    try {
      const responseData = await getRequest(`/search`, { query });
      return responseData;
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  }

  async getPlaylistData(playlistId: string) {
    return getRequest(`/playlists/${playlistId}`);
  }

  async getPlaylistInsights(playlistId: string) {
    return getRequest(`/playlists/${playlistId}/insights`);
  }

  async getPlaylistTracks(playlistId: string) {
    return getRequest(`/playlists/${playlistId}/tracks`);
  }

  async getPlaylistTopTracks(playlistId: string) {
    return getRequest(`/playlists/${playlistId}/top-tracks`);
  }

  async getPlaylistTopArtists(playlistId: string) {
    return getRequest(`/playlists/${playlistId}/top-artists`);
  }

  async getArtistData(artistId: string) {
    return getRequest(`/artists/${artistId}`);
  }

  async exportAlbumInsights(id: string, data: {
    album: AlbumInterface,
    insights: InsightsInterface,
    topTracks: TopTracksInterface,
    artist: ArtistCompactInterface
  }) {
    return downloadPDF(`/albums/${id}/insights/export`, data);
  }

  async exportPlaylistInsights(id: string, data: {
    playlist: PlaylistInterface,
    insights: InsightsInterface,
    topTracks: TopTracksInterface,
  }) {
    return downloadPDF(`/playlists/${id}/insights/export`, data);
  }

  async exportArtistInsights(id: string, data: {
    artist: ArtistInterface,
  }) {
    return downloadPDF(`/artists/${id}/insights/export`, data);
  }

  async exportGenreInsights(data: {
    topGenres: GenreInterface[],
    genreName: string,
    topArtist: TopGenreTagInterface[],
    topTracks: TopGenreTagInterface[],
    topAlbums: TopGenreTagInterface[],
  })
  {
    return downloadPDF(`/genres/insights/export`, data);
  }
}

export const musicService = new MusicService();