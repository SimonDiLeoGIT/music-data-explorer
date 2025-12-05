import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class SpotifyService {
  constructor() {
    this.baseUrl = process.env.MUSIC_API_BASE_URL;
    this.authUrl = process.env.MUSIC_API_AUTH_URL;
    this.token = null;
    this.tokenExpiration = null;
    this.clientId = process.env.MUSIC_API_CLIENT_ID;
    this.clientSecret = process.env.MUSIC_API_CLIENT_SECRET;

    // Validar credenciales al inicio
    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Missing Spotify API credentials in environment variables"
      );
    }
  }

  async getRequest(url, params = {}) {
    try {
      await this.ensureValidToken();
      const res = await axios.get(`${this.baseUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params,
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        // Token inválido, reintentar con nuevo token
        this.token = null;
        await this.ensureValidToken();
        return this.getRequest(url, params);
      }
      throw this.handleSpotifyError(err);
    }
  }

  async authenticate() {
    const token = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64"
    );

    try {
      const res = await axios.post(
        this.authUrl,
        new URLSearchParams({ grant_type: "client_credentials" }).toString(),
        {
          headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.token = res.data.access_token;
      const expiresIn = (res.data.expires_in - 300) * 1000;
      this.tokenExpiration = Date.now() + expiresIn;
    } catch (err) {
      throw new Error("Error obtaining Spotify token: " + err.message);
    }
  }

  async ensureValidToken() {
    if (!this.token || Date.now() >= this.tokenExpiration) {
      await this.authenticate();
    }
  }

  handleSpotifyError(err) {
    const status = err.response?.status;
    const message = err.response?.data?.error?.message || err.message;

    switch (status) {
      case 404:
        return new Error(`Resource not found: ${message}`);
      case 429:
        return new Error(`Rate limit exceeded: ${message}`);
      case 401:
        return new Error(`Authentication failed: ${message}`);
      default:
        return new Error(`Spotify API error: ${message}`);
    }
  }

  async getAlbumData(albumId) {
    if (!albumId) {
      throw new Error("Album ID is required");
    }
    return this.getRequest(`/albums/${albumId}`);
  }

  async getAlbumTracks(albumId, limit = 50, offset = 0) {
    if (!albumId) {
      throw new Error("Album ID is required");
    }
    return this.getRequest(`/albums/${albumId}/tracks`, { limit, offset });
  }

  async getTrackDetails(trackId) {
    if (!trackId) {
      throw new Error("Track ID is required");
    }
    return this.getRequest(`/tracks/${trackId}`);
  }

  async getSeveralTracksDetails(trackIds) {
    if (!trackIds || trackIds.length === 0) {
      throw new Error("Track IDs array is required");
    }

    // Spotify permite máximo 50 tracks por request
    const BATCH_SIZE = 50;
    const batches = [];

    for (let i = 0; i < trackIds.length; i += BATCH_SIZE) {
      const batch = trackIds.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }

    const results = await Promise.all(
      batches.map((batch) =>
        this.getRequest(`/tracks`, { ids: batch.join(",") })
      )
    );

    // Combinar resultados
    return {
      tracks: results.flatMap((result) => result.tracks),
    };
  }

  async getNewReleases(limit = 10, offset = 0, country = "US") {
    if (limit > 50) limit = 50; // Límite de Spotify
    return this.getRequest(`/browse/new-releases`, {
      limit,
      offset,
      country,
    });
  }

  async searchAlbums(query, limit = 10) {
    return this.getRequest(`/search`, {
      q: query,
      type: "album",
      limit,
    });
  }
}

export default new SpotifyService();
