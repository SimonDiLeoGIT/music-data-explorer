import SpotifyService from "../services/spotify.service.js";
import InsightsService from "../services/insights.service.js";
import LastfmService from "../services/lastfm.service.js";
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

export async function albumInsights(req, res) {
  const albumId = req.params.id;

  try {
    // Album Data
    const albumData = await SpotifyService.getAlbumData(albumId);

    const albumTimeInsights = InsightsService.albumTimeInsights(
      albumData.tracks.items
    );

    const explicitTracks = InsightsService.albumExplicitTracks(
      albumData.tracks.items
    );

    const trackIds = albumData.tracks.items.map((track) => track.id);
    const tracksDetails = await SpotifyService.getSeveralTracksDetails(
      trackIds
    );

    const albumPopulatiryInsights = InsightsService.albumPopulatiryInsights(
      tracksDetails.tracks
    );

    // Album Lasft fm data
    const albumStats = await LastfmService.getAlbumInfo(
      albumData.artists[0].name,
      albumData.name
    );

    const reducedAlbumStats = {
      listeners: albumStats.album.listeners,
      playcount: albumStats.album.playcount,
    };

    // Artist Last fm data
    const artistInfo = await LastfmService.getArtistInfo(
      albumStats.album.artist
    );

    // Artist Spotify data
    const artistData = await SpotifyService.getArtistData(
      albumData.artists[0].id
    );

    const reducedArtistInfo = {
      name: albumData.artists[0].name,
      listeners: artistInfo.artist.stats.listeners,
      playcount: artistInfo.artist.stats.playcount,
      bio: artistInfo.artist.bio.summary,
      image: artistData.images[0].url,
    };

    const albumInsights = {
      id: albumData.id,
      name: albumData.name,
      artist: reducedArtistInfo,
      releaseDate: albumData.release_date.split("-")[0],
      cover: albumData.images[0].url,
      totalTracks: albumData.tracks.total,
      time: {
        totalDuration: durationMsToTimeString(albumTimeInsights.totalDuration),
        averageDuration: durationMsToTimeString(
          albumTimeInsights.averageDuration
        ),
        longestTrack: reduceTrackInfo(albumTimeInsights.longestTrack),
        shortestTrack: reduceTrackInfo(albumTimeInsights.shortestTrack),
      },
      popularity: {
        average: albumPopulatiryInsights.popularityAverage,
        mostPopularTrack: reduceTrackInfo(
          albumPopulatiryInsights.mostPopularTrack
        ),
        leastPopularTrack: reduceTrackInfo(
          albumPopulatiryInsights.leastPopularTrack
        ),
      },
      explicitTracks,
      stats: reducedAlbumStats,
    };

    res.json(albumInsights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function albumTracks(req, res) {
  const albumId = req.params.id;
  const sortBy = req.query.sortBy || "trackNumber";
  const sortOrder = req.query.sortOrder || "asc";

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

    if (sortBy === "duration") {
      if (sortOrder === "desc") {
        reducedTracks.sort((a, b) => b.duration.ms - a.duration.ms);
      } else {
        reducedTracks.sort((a, b) => a.duration.ms - b.duration.ms);
      }
    } else if (sortBy === "popularity") {
      if (sortOrder === "desc") {
        reducedTracks.sort((a, b) => b.popularity - a.popularity);
      } else {
        reducedTracks.sort((a, b) => a.popularity - b.popularity);
      }
    } else if (sortBy === "name") {
      if (sortOrder === "desc") {
        reducedTracks.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        reducedTracks.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      if (sortOrder === "desc") {
        reducedTracks.sort((a, b) => b.trackNumber - a.trackNumber);
      } else {
        reducedTracks.sort((a, b) => a.trackNumber - b.trackNumber);
      }
    }

    res.json(reducedTracks);
  } catch (err) {
    throw new Error("Error fetching album tracks: " + err.message);
  }
}

export async function newReleases(req, res) {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  try {
    const newReleasesData = await SpotifyService.getNewReleases(limit, offset);

    const reducedAlbums = newReleasesData.albums.items.map((album) => ({
      id: album.id,
      name: album.name,
      artist: album.artists.map((artist) => artist.name).join(", "),
      releaseDate: album.release_date.split("-")[0],
      cover: album.images,
      totalTracks: album.total_tracks,
    }));

    res.json(reducedAlbums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function albumsPopularityInsights(req, res) {
  if (!req.body || !req.body.albums) {
    return res.status(400).json({
      error: "Missing albums array in request body",
    });
  }

  const albums = req.body.albums;
  try {
    const albumsPopularity = [];

    for (const album of albums.split(",")) {
      const albumData = await SpotifyService.getAlbumData(album);

      if (!albumData) {
        return res.status(404).json({ error: "Album not found" });
      }

      const albumReducedData = {
        id: albumData.id,
        name: albumData.name,
        artist: albumData.artists.map((artist) => artist.name).join(", "),
      };

      const albumTracks = await SpotifyService.getAlbumTracks(album);

      const trackIds = albumTracks.items.map((track) => track.id);

      const severalTracksDetails = await SpotifyService.getSeveralTracksDetails(
        trackIds
      );

      const reducedTracks = [];
      for (let i = 0; i < severalTracksDetails.tracks.length; i++) {
        reducedTracks.push(reduceTrackInfo(severalTracksDetails.tracks[i]));
      }
      const albumPopularity = InsightsService.albumPopularity(reducedTracks);

      albumReducedData.popularity = albumPopularity;
      albumsPopularity.push({ ...albumReducedData });
    }

    res.json(albumsPopularity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
