import SpotifyService from "../services/spotify.service.js";
import InsightsService from "../services/insights.service.js";
import { durationMsToTimeString } from "../utils/TimeFormater.js";

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

export async function getPlaylistInsights(req, res) {
  const playlistId = req.params.id;
  try {
    const playlistData = await SpotifyService.getPlaylistData(playlistId);

    const playlistTimeInsights = InsightsService.playlistTimeInsights(
      playlistData.tracks.items
    );

    const playlistPopulatiryInsights =
      InsightsService.playlistPopulatiryInsights(playlistData.tracks.items);

    const explicitTracks = InsightsService.playlistExplicitTracks(
      playlistData.tracks.items
    );

    const playlistInsights = {
      id: playlistId,
      name: playlistData.name,
      cover: playlistData.images[0].url,
      totalTracks: playlistData.tracks.total,
      time: {
        totalDuration: durationMsToTimeString(
          playlistTimeInsights.totalDuration
        ),
        averageDuration: durationMsToTimeString(
          playlistTimeInsights.averageDuration
        ),
        longestTrack: reduceTrackInfo(playlistTimeInsights.longestTrack),
        shortestTrack: reduceTrackInfo(playlistTimeInsights.shortestTrack),
      },
      popularity: {
        average: playlistPopulatiryInsights.popularityAverage,
        mostPopularTrack: reduceTrackInfo(
          playlistPopulatiryInsights.mostPopularTrack
        ),
        leastPopularTrack: reduceTrackInfo(
          playlistPopulatiryInsights.leastPopularTrack
        ),
      },
      explicitTracks,
    };

    res.json(playlistInsights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
