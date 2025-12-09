import SpotifyService from "../services/spotify.service.js";
import InsightsService from "../services/insights.service.js";
import { durationMsToTimeString } from "../utils/TimeFormater.js";
import LastfmService from "../services/lastfm.service.js";
import { processBatch } from "../utils/ProcessBatch.js";

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
      for (const artist of item.track.artists) {
        artists.push(artist);
      }
    }

    // Remove duplicated artists
    const uniqueArtists = Array.from(
      new Map(artists.map((a) => [a.id, a])).values()
    );

    // Fetch stats for each artist
    const artistsWithStats = await processBatch(
      uniqueArtists,
      50, // batch size
      500, // timeout
      async (artist) => {
        try {
          const [artistLfmInfo, artistSpotifyInfo] = await Promise.all([
            LastfmService.getArtistInfo(artist.name),
            SpotifyService.getArtistData(artist.id),
          ]);

          if (!artistLfmInfo.artist) {
            return null;
          }

          return {
            ...artist,
            stats: artistLfmInfo.artist.stats,
            image: artistSpotifyInfo.images?.[0]?.url || null,
          };
        } catch (error) {
          console.error(`Error fetching artist ${artist.name}:`, error);
          return null;
        }
      }
    );

    const reducedArtistsData = artistsWithStats
      .filter((artist) => artist && artist.stats) // Artists with stats only
      .map((artist) => ({
        name: artist.name,
        listeners: parseInt(artist.stats.listeners) || 0,
        playcount: parseInt(artist.stats.playcount) || 0,
        image: artist.image,
      }));

    const topArtists = InsightsService.playlistTopArtists(reducedArtistsData);

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
