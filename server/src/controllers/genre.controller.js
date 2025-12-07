import LastfmService from "../services/lastfm.service.js";

export async function getTopGenres(req, res) {
  try {
    const topGenres = await LastfmService.getTopGenres();
    const reducedGenres = topGenres.tags.tag.map((genre) => ({
      name: genre.name,
      count: genre.taggings,
    }));
    res.json(reducedGenres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopGenreArtists(req, res) {
  const genreTag = req.params.genreTag;
  try {
    const topGenreArtist = await LastfmService.getTopGenreArtists(genreTag);

    for (const artist of topGenreArtist.topartists.artist) {
      const artistInfo = await LastfmService.getArtistInfo(artist.name);
      artist.stats = artistInfo.artist.stats;
    }

    const reducedArtistsData = topGenreArtist.topartists.artist.map(
      (artist) => ({
        name: artist.name,
        apiUrl: artist.url,
        rank: artist["@attr"].rank,
        stats: artist.stats,
        image: artist.image[2]["#text"],
      })
    );

    res.json(reducedArtistsData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopGenreTracks(req, res) {
  const genreTag = req.params.genreTag;
  try {
    const topGenreTracks = await LastfmService.getTopGenreTracks(genreTag);

    const reducedTracksData = topGenreTracks.tracks.track.map((track) => ({
      name: track.name,
      artist: {
        name: track.artist.name,
        apiUrl: track.artist.url,
      },
      apiUrl: track.url,
      rank: track["@attr"].rank,
    }));

    res.json(reducedTracksData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopGenreAlbums(req, res) {
  const genreTag = req.params.genreTag;
  try {
    const topGenreAlbums = await LastfmService.getTopGenreAlbums(genreTag);

    const reducedAlbumsData = topGenreAlbums.albums.album.map((album) => ({
      name: album.name,
      artist: {
        name: album.artist.name,
        apiUrl: album.artist.url,
      },
      apiUrl: album.url,
      rank: album["@attr"].rank,
    }));

    res.json(reducedAlbumsData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
