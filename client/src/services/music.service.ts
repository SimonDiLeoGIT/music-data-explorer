import {getRequest} from './api.service';

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
}

export const musicService = new MusicService();