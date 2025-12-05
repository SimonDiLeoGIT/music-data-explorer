class InsightsService {
  getAlbumDuration(albumTracks) {
    if (!albumTracks || albumTracks.length === 0) {
      return 0;
    }
    return albumTracks.reduce((total, track) => total + track.duration_ms, 0);
  }

  getLongestTrack(albumTracks) {
    return albumTracks.reduce(
      (max, track) => (track.duration_ms > max.duration_ms ? track : max),
      albumTracks[0]
    );
  }

  getShortestTrack(albumTracks) {
    return albumTracks.reduce(
      (min, track) => (track.duration_ms < min.duration_ms ? track : min),
      albumTracks[0]
    );
  }

  getMostPopularTrack(albumTracks) {
    return albumTracks.reduce(
      (max, track) => (track.popularity > max.popularity ? track : max),
      albumTracks[0]
    );
  }

  getLeastPopularTrack(albumTracks) {
    return albumTracks.reduce(
      (min, track) => (track.popularity < min.popularity ? track : min),
      albumTracks[0]
    );
  }

  albumPopularity(albumTracks) {
    if (!albumTracks || albumTracks.length === 0) {
      return 0;
    }
    const totalPopularity = albumTracks.reduce(
      (total, track) => total + track.popularity,
      0
    );
    return Math.round(totalPopularity / albumTracks.length);
  }

  albumExplicitTracks(albumTracks) {
    if (!albumTracks || albumTracks.length === 0) {
      return 0;
    }
    return albumTracks.filter((track) => track.explicit).length;
  }
}

export default new InsightsService();
