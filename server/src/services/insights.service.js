class InsightsService {
  albumTimeInsights(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    const totalDuration = items.reduce(
      (total, item) => total + item.duration_ms,
      0
    );
    const averageDuration = Math.round(totalDuration / items.length);
    const longestTrack = items.reduce(
      (max, item) => (item.duration_ms > max.duration_ms ? item : max),
      items[0]
    );
    const shortestTrack = items.reduce(
      (min, item) => (item.duration_ms < min.duration_ms ? item : min),
      items[0]
    );
    return {
      totalDuration,
      averageDuration,
      longestTrack,
      shortestTrack,
    };
  }

  albumPopulatiryInsights(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    const totalPopularity = items.reduce(
      (total, item) => total + item.popularity,
      0
    );
    const popularityAverage = Math.round(totalPopularity / items.length);
    const mostPopularTrack = items.reduce(
      (max, item) => (item.popularity > max.popularity ? item : max),
      items[0]
    );

    const leastPopularTrack = items.reduce(
      (min, item) => (item.popularity < min.popularity ? item : min),
      items[0]
    );

    return {
      totalPopularity,
      popularityAverage,
      mostPopularTrack,
      leastPopularTrack,
    };
  }

  albumTopTracks(tracks) {
    if (!tracks || tracks.length === 0) {
      return {
        longestTracks: [],
        shortestTracks: [],
        mostPopularTracks: [],
        leastPopularTracks: [],
      };
    }

    const validTracks = tracks
      .map((track) => track)
      .filter((track) => track && track.id);

    const longestTracks = [...validTracks]
      .sort((a, b) => b.duration_ms - a.duration_ms)
      .slice(0, 10);

    const shortestTracks = [...validTracks]
      .sort((a, b) => a.duration_ms - b.duration_ms)
      .slice(0, 10);

    const mostPopularTracks = [...validTracks]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);

    const leastPopularTracks = [...validTracks]
      .sort((a, b) => a.popularity - b.popularity)
      .slice(0, 10);

    return {
      longestTracks,
      shortestTracks,
      mostPopularTracks,
      leastPopularTracks,
    };
  }

  albumExplicitTracks(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    const validTracks = items.filter((item) => item && item.explicit);
    return validTracks.filter((item) => item.explicit).length;
  }

  playlistTimeInsights(items) {
    if (!items || items.length === 0) {
      return 0;
    }

    const validTracks = items
      .map((item) => item.track)
      .filter((track) => track && track.duration_ms);

    const totalDuration = validTracks.reduce(
      (total, track) => total + track.duration_ms,
      0
    );

    const averageDuration = Math.round(totalDuration / validTracks.length);

    const longestTrack = validTracks.reduce(
      (max, track) => (track.duration_ms > max.duration_ms ? track : max),
      validTracks[0]
    );
    const shortestTrack = validTracks.reduce(
      (min, track) => (track.duration_ms < min.duration_ms ? track : min),
      validTracks[0]
    );
    return {
      totalDuration,
      averageDuration,
      longestTrack,
      shortestTrack,
    };
  }

  playlistPopulatiryInsights(items) {
    if (!items || items.length === 0) {
      return 0;
    }

    const validTracks = items
      .map((item) => item.track)
      .filter((track) => track && track.popularity);

    const totalPopularity = validTracks.reduce(
      (total, track) => total + track.popularity,
      0
    );
    const popularityAverage = Math.round(totalPopularity / validTracks.length);
    const mostPopularTrack = validTracks.reduce(
      (max, track) => (track.popularity > max.popularity ? track : max),
      validTracks[0]
    );

    const leastPopularTrack = validTracks.reduce(
      (min, track) => (track.popularity < min.popularity ? track : min),
      validTracks[0]
    );

    return {
      totalPopularity,
      popularityAverage,
      mostPopularTrack,
      leastPopularTrack,
    };
  }

  playlistExplicitTracks(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    const validTracks = items.filter(
      (item) => item.track && item.track.explicit
    );
    return validTracks.filter((item) => item.track.explicit).length;
  }

  playlistTopTracks(tracks) {
    if (!tracks || tracks.length === 0) {
      return {
        longestTracks: [],
        shortestTracks: [],
        mostPopularTracks: [],
        leastPopularTracks: [],
      };
    }

    const validTracks = tracks
      .map((item) => item.track)
      .filter((track) => track && track.duration_ms && track.popularity);

    const longestTracks = [...validTracks]
      .sort((a, b) => b.duration_ms - a.duration_ms)
      .slice(0, 10);

    const shortestTracks = [...validTracks]
      .sort((a, b) => a.duration_ms - b.duration_ms)
      .slice(0, 10);

    const mostPopularTracks = [...validTracks]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);

    const leastPopularTracks = [...validTracks]
      .sort((a, b) => a.popularity - b.popularity)
      .slice(0, 10);

    return {
      longestTracks,
      shortestTracks,
      mostPopularTracks,
      leastPopularTracks,
    };
  }

  playlistArtistsFrequency(artists) {
    if (!artists || artists.length === 0) {
      return [];
    }

    const validArtists = artists.filter((artist) => artist && artist.id);

    const artistCounts = validArtists.reduce((artistsAcc, artist) => {
      const artistId = artist.id;

      if (!artistsAcc[artistId]) {
        artistsAcc[artistId] = {
          ...artist,
          count: 1,
        };
      } else {
        artistsAcc[artistId].count++;
      }

      return artistsAcc;
    }, {});

    const artistsFrequency = Object.values(artistCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { artistsFrequency };
  }
}

export default new InsightsService();
