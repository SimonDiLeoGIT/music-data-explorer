import SpotifyService from "../services/spotify.service.js";

export async function search(req, res) {
  const query = req.query.query;
  try {
    const searchResults = await SpotifyService.search(query, 5);

    const reducedAlbums = searchResults.albums.items
      .filter((album) => album !== null)
      .map((album) => ({
        id: album.id,
        name: album.name,
        artist: album.artists.map((artist) => artist.name).join(", "),
        cover: album.images[0]?.url || null,
      }));

    const reducedPlaylists = searchResults.playlists.items
      .filter((playlist) => playlist !== null)
      .map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        cover: playlist.images[0]?.url || null,
      }));

    const reducedArtists = searchResults.artists.items
      .filter((artist) => artist !== null)
      .map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images[0]?.url || null,
      }));

    const response = {
      albums: reducedAlbums,
      playlists: reducedPlaylists,
      artists: reducedArtists,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
