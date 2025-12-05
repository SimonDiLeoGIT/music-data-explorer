import { getTrackDetails } from "../services/spotify.service.js";

export async function trackDetails(req, res) {
  const trackId = req.params.id;

  try {
    const trackData = await getTrackDetails(trackId);
    res.json(trackData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
