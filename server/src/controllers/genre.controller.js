import ExportPDFService from "../services/exportPDF.service.js";
import LastfmService from "../services/lastfm.service.js";
import { genreReportStyles } from "../templates/genre/genre.styles.js";
import { generateGenreReportHTML } from "../templates/genre/genre.template.js";

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

    await Promise.all(
      topGenreArtist.topartists.artist.map(async (artist) => {
        try {
          const artistInfo = await LastfmService.getArtistInfo(artist.name);
          artist.stats = artistInfo.artist.stats;
        } catch (error) {
          console.error(
            `Error fetching stats for ${artist.name}:`,
            error.message
          );
          album.stats = {
            playcount: null,
            listeners: null,
          };
        }
      })
    );

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

    await Promise.all(
      topGenreTracks.tracks.track.map(async (track) => {
        try {
          const trackInfo = await LastfmService.getTrackInfo(
            track.name,
            track.artist.name
          );
          track.stats = {
            playcount: trackInfo.track.playcount,
            listeners: trackInfo.track.listeners,
          };
        } catch (error) {
          console.error(
            `Error fetching stats for ${track.name}:`,
            error.message
          );
          track.stats = {
            playcount: null,
            listeners: null,
          };
        }
      })
    );

    const reducedTracksData = topGenreTracks.tracks.track.map((track) => ({
      name: track.name,
      artist: {
        name: track.artist.name,
        apiUrl: track.artist.url,
      },
      apiUrl: track.url,
      rank: track["@attr"].rank,
      stats: track.stats,
      image: track.image[2]["#text"],
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

    await Promise.all(
      topGenreAlbums.albums.album.map(async (album) => {
        try {
          const albumInfo = await LastfmService.getAlbumInfo(
            album.name,
            album.artist.name
          );
          album.stats = {
            playcount: albumInfo.album.playcount,
            listeners: albumInfo.album.listeners,
          };
        } catch (error) {
          console.error(
            `Error fetching stats for ${album.name}:`,
            error.message
          );
          album.stats = {
            playcount: null,
            listeners: null,
          };
        }
      })
    );

    const reducedAlbumsData = topGenreAlbums.albums.album.map((album) => ({
      name: album.name,
      artist: {
        name: album.artist.name,
        apiUrl: album.artist.url,
      },
      apiUrl: album.url,
      rank: album["@attr"].rank,
      stats: album.stats,
    }));

    res.json(reducedAlbumsData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function exportGenreReport(req, res) {
  try {
    const { topGenres, genreName, topArtist, topTracks, topAlbums } = req.body;

    const html = generateGenreReportHTML(
      topGenres,
      genreName,
      topArtist,
      topTracks,
      topAlbums
    );
    const pdf = await ExportPDFService.generatePDF(html, genreReportStyles);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="genre-${genreName.replace(
        /[^a-z0-9]/gi,
        "_"
      )}-report.pdf"`
    );
    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
