import {
  formatNumber,
  formatNumberWithCommas,
} from "../../utils/formatNumbers.js";

export const generateArtistReportHTML = (artist) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Procesar Top Tracks (máximo 10)
  const topTracksHtml =
    artist.topTracks && artist.topTracks.length > 0
      ? artist.topTracks
          .slice(0, 10)
          .map(
            (track, index) => `
        <li class="track-item">
          <span class="track-number">${index + 1}.</span>
          <span class="track-name">${track.name} (${track.album.name})</span>
          <span class="track-popularity">${track.popularity}</span>
        </li>
      `
          )
          .join("")
      : '<li class="track-item">No top tracks available.</li>';

  // Procesar Álbumes/Discografía (máximo 12)
  const albumsHtml =
    artist.albums && artist.albums.length > 0
      ? artist.albums
          .map(
            (album) => `
        <div class="album-card">
          <img class="album-cover-small" src="${album.cover}" alt="${album.name}" />
          <div class="album-details">
            <p class="album-name">${album.name}</p>
            <p class="album-metadata">${album.releaseDate} • ${album.totalTracks} tracks</p>
          </div>
        </div>
      `
          )
          .join("")
      : "<p>No recent albums or releases available.</p>";

  // Procesar Géneros
  const genresHtml =
    artist.genres && artist.genres.length > 0
      ? artist.genres
          .slice(0, 5)
          .map((genre) => `<span class="genre-tag">${genre}</span>`)
          .join("")
      : '<span class="genre-tag">N/A</span>';

  return `
    <div class="container">
      <header class="header">
        <img class="artist-image" src="${artist.image}" alt="${artist.name}" />
        <h1 class="title">${artist.name}</h1>
        <p class="subtitle">Artist Profile Report</p>
        <p class="metadata">
          Popularity: ${artist.popularity}/100 
        </p>
        <div class="genre-list">
            ${genresHtml}
        </div>
      </header>

      <section class="section">
        <h2 class="section-title">Global Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <p class="stat-label">Listeners</p>
            <p class="stat-value" title="${formatNumberWithCommas(
              artist.listeners
            )}">
              ${artist.listeners ? formatNumber(artist.listeners) : "N/A"}
            </p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Plays</p>
            <p class="stat-value" title="${formatNumberWithCommas(
              artist.playcount
            )}">
              ${artist.playcount ? formatNumber(artist.playcount) : "N/A"}
            </p>
          </div>
        </div>
      </section>

      ${
        artist.bio
          ? `
      <section class="section">
        <h2 class="section-title">Biography</h2>
        <div class="artist-bio">
          ${artist.bio}
        </div>
      </section>
      `
          : ""
      }

      <section class="section">
        <h2 class="section-title">Top 10 Most Popular Tracks</h2>
        <ol class="track-list">
          ${topTracksHtml}
        </ol>
      </section>

      <section class="section">
        <h2 class="section-title">Albums <span>Discography</span></h2>
        <div class="albums-grid">
          ${albumsHtml}
        </div>
      </section>

      <footer class="footer">
        <p>Report generated on ${date}</p>
      </footer>
    </div>
  `;
};
