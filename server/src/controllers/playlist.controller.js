import SpotifyService from "../services/spotify.service.js";
import InsightsService from "../services/insights.service.js";
import { durationMsToTimeString } from "../utils/TimeFormater.js";
import LastfmService from "../services/lastfm.service.js";

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

export async function getPlaylistData(req, res) {
  const playlistId = req.params.id;
  try {
    const playlistData = await SpotifyService.getPlaylistData(playlistId);

    const reducedPlaylistData = {
      id: playlistId,
      name: playlistData.name,
      cover: playlistData.images[0].url,
      totalTracks: playlistData.tracks.total,
    };

    res.json(reducedPlaylistData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlaylistInsights(req, res) {
  const playlistId = req.params.id;
  try {
    const playlistTracks = await SpotifyService.getAllPlaylistTracks(
      playlistId
    );

    const playlistTimeInsights = InsightsService.playlistTimeInsights(
      playlistTracks.items
    );

    const playlistPopulatiryInsights =
      InsightsService.playlistPopulatiryInsights(playlistTracks.items);

    const explicitTracks = InsightsService.playlistExplicitTracks(
      playlistTracks.items
    );

    const playlistInsights = {
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

export async function getPlaylistTopTracks(req, res) {
  const playlistId = req.params.id;
  try {
    const playlistTracks = await SpotifyService.getAllPlaylistTracks(
      playlistId
    );

    const topTracks = InsightsService.playlistTopTracks(playlistTracks.items);

    const response = {
      longestTracks: topTracks.longestTracks.map((track) =>
        reduceTrackInfo(track)
      ),
      shortestTracks: topTracks.shortestTracks.map((track) =>
        reduceTrackInfo(track)
      ),
      mostPopularTracks: topTracks.mostPopularTracks.map((track) =>
        reduceTrackInfo(track)
      ),
      leastPopularTracks: topTracks.leastPopularTracks.map((track) =>
        reduceTrackInfo(track)
      ),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlaylistTopArtists(req, res) {
  const playlistId = req.params.id;
  try {
    const playlistTracks = await SpotifyService.getAllPlaylistTracks(
      playlistId
    );

    const artists = [];
    for (const item of playlistTracks.items) {
      if (!item.track || !item.track.artists) continue;
      for (const artist of item.track.artists) {
        artists.push(artist);
      }
    }

    const reducedArtistsData = artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    }));

    const topArtists =
      InsightsService.playlistArtistsFrequency(reducedArtistsData);

    topArtists.totalArtists = playlistTracks.items.length;

    res.json(topArtists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlaylistTracks(req, res) {
  const playlistId = req.params.id;

  try {
    const playlistTracks = await SpotifyService.getPlaylistTracks(playlistId);

    const trackIds = playlistTracks.items.map((item) => item.track.id);

    const severalTracksDetails = await SpotifyService.getSeveralTracksDetails(
      trackIds
    );

    const reducedTracks = [];
    for (let i = 0; i < severalTracksDetails.tracks.length; i++) {
      reducedTracks.push(reduceTrackInfo(severalTracksDetails.tracks[i]));
    }

    res.json(reducedTracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
