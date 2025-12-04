import { getAlbumData, getAlbumTracks } from "../services/music.service.js";

export async function albumInsights(req, res) {
  const albumId = req.params.id;

  try {
    const albumData = await getAlbumData(albumId);

    const trackCount = albumData.total_tracks;
    const totalDurationMs = albumData.tracks.items.reduce(
      (sum, track) => sum + track.duration_ms,
      0
    );
    const albumTracks = albumData.tracks;

    // longest track
    const longestTrack = albumTracks.items.reduce((max, track) => {
      if (track.duration_ms > max.duration_ms) {
        return track;
      }
      return max;
    }, albumTracks.items[0]);

    // longest track
    const shortestTrack = albumTracks.items.reduce((min, track) => {
      if (track.duration_ms < min.duration_ms) {
        return track;
      }
      return min;
    }, albumTracks.items[0]);

    // Calculate average duration
    const averageDurationMs =
      totalDurationMs / albumData.tracks.items.length || 0;

    const albumInsights = {
      name: albumData.name,
      artist: albumData.artists.map((artist) => artist.name).join(", "),
      releaseDate: albumData.release_date,
      cover: albumData.images,
      trackCount,
      totalDurationMs,
      averageDurationMs,
      longestTrack: longestTrack.id,
      shortestTrack: shortestTrack.id,
    };

    res.json(albumInsights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get Album tracks with filters
export async function albumTracks(req, res) {
  const albumId = req.params.id;
  const sortBy = req.query.sortBy || "track_number"; // default sort by track number

  try {
    const albumData = await getAlbumTracks(albumId);
    let tracks = albumData.items;

    const tracksDetailed = tracks.map((track) => ({
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      track_number: track.track_number,
    }));

    if (sortBy === "duration") {
      tracksDetailed.sort((a, b) => b.duration_ms - a.duration_ms);
    } else if (sortBy === "popularity") {
      tracksDetailed.sort((a, b) => b.popularity - a.popularity);
    } else {
      tracksDetailed.sort((a, b) => a.track_number - b.track_number);
    }

    res.json(tracksDetailed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
