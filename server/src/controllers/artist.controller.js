import SpotifyService from "../services/spotify.service.js";
import InsightsService from "../services/insights.service.js";
import LastfmService from "../services/lastfm.service.js";
import { durationMsToTimeString } from "../utils/TimeFormater.js";
import { generateArtistReportHTML } from "../templates/artist/artist.template.js";
import { artistReportStyles } from "../templates/artist/artist.styles.js";
import ExportPDFService from "../services/exportPDF.service.js";

export async function artistData(req, res) {
  const artistId = req.params.id;
  try {
    // Artist Spotify data
    const artistData = await SpotifyService.getArtistData(artistId);

    let stats;
    let bio;
    // Artist Last fm data
    try {
      const artistInfo = await LastfmService.getArtistInfo(artistData.name);

      stats = {
        listeners: artistInfo.artist.stats.listeners,
        playcount: artistInfo.artist.stats.playcount,
      };

      bio = artistInfo.artist.bio.summary;
    } catch (error) {
      console.error(
        `Error fetching stats for ${artistData.name}:`,
        error.message
      );
      stats = {
        listeners: null,
        playcount: null,
      };
      bio = null;
    }

    // Artist top tracks
    const artistTopTracks = await SpotifyService.getArtistTopTracks(
      artistData.id
    );

    const tracks = artistTopTracks.tracks.map((track) => ({
      id: track.id,
      name: track.name,
      album: {
        id: track.album.id,
        name: track.album.name,
        cover: track.album.images[0].url,
      },
      popularity: track.popularity,
      duration: durationMsToTimeString(track.duration_ms),
      explicit: artistData.explicit,
    }));

    const artistAlbums = await SpotifyService.getArtistAlbums(artistData.id);

    const albums = artistAlbums.items.map((album) => ({
      id: album.id,
      name: album.name,
      cover: album.images[0].url,
      releaseDate: album.release_date,
      totalTracks: album.total_tracks,
    }));

    const response = {
      name: artistData.name,
      genres: artistData.genres,
      image: artistData.images[0].url,
      popularity: artistData.popularity,
      listeners: stats.listeners,
      playcount: stats.playcount,
      bio,
      topTracks: tracks,
      albums: albums,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function exportArtistReport(req, res) {
  try {
    const artistData = req.body.artist;

    if (!artistData) {
      return res.status(400).json({ error: "Artist data not provided." });
    }

    const html = generateArtistReportHTML(artistData);

    const pdf = await ExportPDFService.generatePDF(html, artistReportStyles);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="artist-${artistData.name.replace(
        /[^a-z0-9]/gi,
        "_"
      )}-report.pdf"`
    );
    res.send(pdf);
  } catch (error) {
    console.error("Error generating Artist PDF:", error);
    res.status(500).json({ error: "Failed to generate Artist PDF" });
  }
}
