import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class LastfmService {
  constructor() {
    this.baseUrl = process.env.LASTFM_API_BASE_URL;
    this.apiKey = process.env.LASTFM_API_KEY;

    // Validar credenciales al inicio
    if (!this.apiKey) {
      throw new Error(
        "Missing LastFM API credentials in environment variables"
      );
    }
  }

  async getRequest(url, params = {}) {
    try {
      const res = await axios.get(`${this.baseUrl}${url}`);
      return res.data;
    } catch (err) {
      throw this.handleHttpError(err);
    }
  }

  handleHttpError(err) {
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
        return new Error(`LastFM API error: ${message}`);
    }
  }

  async getTopGenders() {
    const url = `?method=chart.gettoptags&api_key=${this.apiKey}&format=json&limit=10`;
    return this.getRequest(url);
  }

  async getTopGenderArtists(genderTag) {
    const url = `?method=tag.gettopartists&tag=${genderTag}&api_key=${this.apiKey}&format=json&limit=5`;
    return this.getRequest(url);
  }

  async getTopGenderTracks(genderTag) {
    const url = `?method=tag.gettoptracks&tag=${genderTag}&api_key=${this.apiKey}&format=json&limit=5`;
    return this.getRequest(url);
  }

  async getTopGenderAlbums(genderTag) {
    const url = `?method=tag.gettopalbums&tag=${genderTag}&api_key=${this.apiKey}&format=json&limit=5`;
    return this.getRequest(url);
  }

  async getArtistInfo(artistName) {
    const url = `?method=artist.getinfo&artist=${artistName}&api_key=${this.apiKey}&format=json`;
    return this.getRequest(url);
  }

  async getAlbumStats(albumArtist, albumName) {
    const url = `?method=album.getinfo&artist=${albumArtist}&album=${albumName}&api_key=${this.apiKey}&format=json`;
    return this.getRequest(url);
  }
}

export default new LastfmService();
