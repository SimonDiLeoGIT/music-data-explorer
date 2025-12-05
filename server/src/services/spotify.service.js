import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getToken() {
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

    return res.data.access_token;
  } catch (err) {
    throw new Error("Error obtaining Spotify token: " + err.message);
  }
}

export async function getAlbumData(albumId) {
  const token = await getToken();

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Error fetching album data: " + err.message);
  }
}

export async function getAlbumTracks(albumId) {
  const token = await getToken();

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Error fetching album tracks: " + err.message);
  }
}

export async function getTrackDetails(trackId) {
  const token = await getToken();

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Error fetching track details: " + err.message);
  }
}
