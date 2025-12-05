import SpotifyService from "../services/spotify.service.js";

export async function albumInsights(req, res) {
  const albumId = req.params.id;

  try {
    const albumData = await SpotifyService.getAlbumData(albumId);

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

    const totalDuration = {
      ms: totalDurationMs,
      timeString: durationMsToTimeString(totalDurationMs),
    };

    const averageDuration = {
      ms: averageDurationMs,
      timeString: durationMsToTimeString(averageDurationMs),
    };

    // Get release year only
    const releaseDate = albumData.release_date.split("-")[0];

    const albumInsights = {
      albumId: albumData.id,
      name: albumData.name,
      artist: albumData.artists.map((artist) => artist.name).join(", "),
      releaseDate,
      cover: albumData.images,
      trackCount,
      totalDuration,
      averageDuration,
      longestTrack: reduceTrackInfo(longestTrack),
      shortestTrack: reduceTrackInfo(shortestTrack),
      tracks: albumTracks.items.map((track) => track.id),
    };

    res.json(albumInsights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const durationMsToTimeString = (durationMs) => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const durationString =
    hours > 0
      ? `${hours}h ` + `${minutes}m`
      : `${minutes}m ` + seconds.toString().padStart(2, "0") + "s";
  return durationString;
};

function reduceTrackInfo(track) {
  return {
    id: track.id,
    name: track.name,
    duration: {
      ms: track.duration_ms,
      timeString: durationMsToTimeString(track.duration_ms),
    },
    popularity: track.popularity,
    explicit: track.explicit,
    trackNumber: track.track_number,
  };
}

export async function albumTracks(req, res) {
  const albumId = req.params.id;

  try {
    const albumTracks = await SpotifyService.getAlbumTracks(albumId);

    if (!albumTracks) {
      return res.status(404).json({ error: "Album not found" });
    }

    const trackIds = albumTracks.items.map((track) => track.id);

    const severalTracksDetails = await SpotifyService.getSeveralTracksDetails(
      trackIds
    );

    const reducedTracks = [];
    for (let i = 0; i < severalTracksDetails.tracks.length; i++) {
      reducedTracks.push(reduceTrackInfo(severalTracksDetails.tracks[i]));
    }
    res.json(reducedTracks);
  } catch (err) {
    throw new Error("Error fetching album tracks: " + err.message);
  }
}
