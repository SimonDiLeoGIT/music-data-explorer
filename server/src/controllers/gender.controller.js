import LastfmService from "../services/lastfm.service.js";

export async function getTopGenders(req, res) {
  try {
    const topGenders = await LastfmService.getTopGenders();
    const reducedGenders = topGenders.tags.tag.map((gender) => ({
      name: gender.name,
      count: gender.taggings,
    }));
    res.json(reducedGenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTopGenderArtists(req, res) {
  const genderTag = req.params.genderTag;
  try {
    const topGenderArtist = await LastfmService.getTopGenderArtists(genderTag);

    for (const artist of topGenderArtist.topartists.artist) {
      const artistInfo = await LastfmService.getArtistInfo(artist.name);
      artist.stats = artistInfo.artist.stats;
    }

    const reducedArtistsData = topGenderArtist.topartists.artist.map(
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

export async function getTopGenderTracks(req, res) {
  const genderTag = req.params.genderTag;
  try {
    const topGenderTracks = await LastfmService.getTopGenderTracks(genderTag);

    const reducedTracksData = topGenderTracks.tracks.track.map((track) => ({
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

export async function getTopGenderAlbums(req, res) {
  const genderTag = req.params.genderTag;
  try {
    const topGenderAlbums = await LastfmService.getTopGenderAlbums(genderTag);

    const reducedAlbumsData = topGenderAlbums.albums.album.map((album) => ({
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
