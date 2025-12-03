import { getSpotifyToken } from "../services/spotify.service.js";

async function getToken(req, res) {
  try {
    const token = await getSpotifyToken();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

module.exports = { getToken };
