import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class SpotifyService {
  constructor() {
    this.baseUrl = "https://api.spotify.com/v1";
    this.token = null;
    this.tokenExpiration = null;
  }

  async getRequest(url, params = {}) {
    await this.ensureValidToken();
    const res = await axios.get(`${this.baseUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params,
    });
    return res.data;
  }

  async authenticate() {
    const clientId = process.env.MUSIC_API_CLIENT_ID;
    const clientSecret = process.env.MUSIC_API_CLIENT_SECRET;

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    try {
      const res = await axios.post(
        "https://accounts.spotify.com/api/token",
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
      console.log("Refreshing token");
      await this.authenticate();
    }
  }

  async getAlbumData(albumId) {
    try {
      const data = await this.getRequest(`/albums/${albumId}`);
      return data;
    } catch (err) {
      throw new Error("Error fetching album data: " + err.message);
    }
  }

  async getAlbumTracks(albumId) {
    try {
      const data = await this.getRequest(`/albums/${albumId}/tracks`);
      return data;
    } catch (err) {
      throw new Error("Error fetching album tracks: " + err.message);
    }
  }

  async getTrackDetails(trackId) {
    try {
      const data = await this.getRequest(`/tracks/${trackId}`);
      return data;
    } catch (err) {
      throw new Error("Error fetching track details: " + err.message);
    }
  }

  async getSeveralTracksDetails(trackIds) {
    try {
      const data = await this.getRequest(`/tracks`, {
        ids: trackIds.join(","),
      });
      return data;
    } catch (err) {
      throw new Error("Error fetching track details: " + err.message);
    }
  }
}

export default new SpotifyService();
