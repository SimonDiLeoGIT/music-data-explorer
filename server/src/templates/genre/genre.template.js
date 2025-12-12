import {
  formatNumber,
  formatNumberWithCommas,
} from "../../utils/formatNumbers.js";

export const generateGenreReportHTML = (
  topGenres,
  genreName,
  topArtists,
  topTracks,
  topAlbums
) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const topGenresHtml =
    topGenres && topGenres.length > 0
      ? topGenres
          .slice(0, 10)
          .map(
            (genre) => `
        <div class="genre-row">
            <span class="genre-name">${genre.name}</span>
            <span class="genre-count">${formatNumberWithCommas(
              genre.count
            )} tags</span>
        </div>
      `
          )
          .join("")
      : '<div class="genre-row empty">No global genre data available.</div>';

  const generateTopListHtml = (items, type) => {
    if (!items || items.length === 0) {
      return '<li class="track-item empty">No data available.</li>';
    }

    return items
      .slice(0, 10)
      .map((item, index) => {
        const secondaryInfo =
          (type === "Track" || type === "Album") && item.artist
            ? `<span class="track-artist"> by ${item.artist.name}</span>`
            : "";

        const statValue = item.stats?.listeners
          ? formatNumber(item.stats.listeners)
          : "N/A";

        const statTitle = item.stats?.listeners
          ? formatNumberWithCommas(item.stats.listeners) + " listeners"
          : "N/A";

        return `
        <li class="track-item" title="${statTitle}">
          <span class="track-number">${index + 1}.</span>
          <span class="track-name">${item.name}</span>
          ${secondaryInfo}
          <span class="track-stat">${statValue} listeners</span>
        </li>
      `;
      })
      .join("");
  };

  const artistsHtml = generateTopListHtml(topArtists, "Artist");
  const tracksHtml = generateTopListHtml(topTracks, "Track");
  const albumsHtml = generateTopListHtml(topAlbums, "Album");

  const mostPopularArtist = topArtists?.length > 0 ? topArtists[0].name : "N/A";

  return `
    <div class="container">
      <header class="header">
        <h1 class="title">${genreName} <span>Genre Insights</span></h1>
        <p class="subtitle">Detailed analysis based on Last.fm data.</p>
        <p class="metadata">
          Report generated on ${date}
        </p>
      </header>
      
      <section class="section">
        <h2 class="section-title">Global Top Genres Overview</h2>
        <div class="top-genres-list">
          <div class="genre-row header-row">
              <span class="genre-name">Genre Name</span>
              <span class="genre-count">Tag Count</span>
          </div>
          ${topGenresHtml}
        </div>
      </section>

      <div class="divider">--- Specific Genre Analysis: ${genreName} ---</div>

      <section class="section">
        <h2 class="section-title">Insights Summary for ${genreName}</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <p class="stat-label">Total Aggregate Users Taggings</p>
            <p class="stat-value">
              ${formatNumber(
                topGenres.filter((genre) => genre.name === genreName)[0].count
              )}
            </p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Most Popular Artist in ${genreName}</p>
            <p class="stat-value-small">${mostPopularArtist}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Top Artists in ${genreName} (by Listeners)</h2>
        <ol class="track-list">
          ${artistsHtml}
        </ol>
      </section>

      <section class="section">
        <h2 class="section-title">Top Albums in ${genreName} (by Listeners)</h2>
        <ol class="track-list">
          ${albumsHtml}
        </ol>
      </section>

      <section class="section">
        <h2 class="section-title">Top Tracks in ${genreName} (by Listeners)</h2>
        <ol class="track-list">
          ${tracksHtml}
        </ol>
      </section>

      <footer class="footer">
        <p>Data sourced from Last.fm API. Report generated on ${date}</p>
      </footer>
    </div>
  `;
};
