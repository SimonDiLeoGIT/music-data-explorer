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

  albumExplicitTracks(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.filter((item) => item.explicit).length;
  }

  playlistTimeInsights(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    const totalDuration = items.reduce(
      (total, item) => total + item.track.duration_ms,
      0
    );
    const averageDuration = Math.round(totalDuration / items.length);
    const longestTrack = items.reduce(
      (max, item) =>
        item.track.duration_ms > max.duration_ms ? item.track : max,
      items[0].track
    );
    const shortestTrack = items.reduce(
      (min, item) =>
        item.track.duration_ms < min.duration_ms ? item.track : min,
      items[0].track
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
    const totalPopularity = items.reduce(
      (total, item) => total + item.track.popularity,
      0
    );
    const popularityAverage = Math.round(totalPopularity / items.length);
    const mostPopularTrack = items.reduce(
      (max, item) =>
        item.track.popularity > max.popularity ? item.track : max,
      items[0].track
    );

    const leastPopularTrack = items.reduce(
      (min, item) =>
        item.track.popularity < min.popularity ? item.track : min,
      items[0].track
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
    return items.filter((item) => item.track.explicit).length;
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
}

export default new InsightsService();
