import {
  formatNumber,
  formatNumberWithCommas,
} from "../../utils/formatNumbers.js";

export const generatePlaylistReportHTML = (
  playlist,
  insights,
  topTracks,
  topArtists
) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <div class="container">
      <header class="header">
        <img class="playlist-cover" src="${playlist.cover}" alt="${
    playlist.name
  }" />
        <h1 class="title">${playlist.name} <span>Playlist</span></h1>
        <p class="metadata">
          ${playlist.totalTracks} tracks • ${
    insights.time.totalDuration
  } • Last updated: ${date}
        </p>
      </header>

      <section class="section">
        <h2 class="section-title">Statistics Overview</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <p class="stat-label">Total Tracks</p>
            <p class="stat-value" title="${formatNumberWithCommas(
              playlist.totalTracks
            )}">
              ${formatNumber(playlist.totalTracks)}
            </p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Total Duration</p>
            <p class="stat-value">
              ${insights.time.totalDuration}
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Duration Analysis</h2>
        <div class="insight-list">
          <div class="insight-item">
            <span class="insight-label">Longest Track:</span>
            <span class="insight-value">
              ${insights.time.longestTrack.name} (${
    insights.time.longestTrack.duration.timeString
  })
            </span>
          </div>
          <div class="insight-item">
            <span class="insight-label">Shortest Track:</span>
            <span class="insight-value">
              ${insights.time.shortestTrack.name} (${
    insights.time.shortestTrack.duration.timeString
  })
            </span>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Artist Diversity</h2>
        <div class="insight-list">
          <div class="insight-item">
            <span class="insight-label">Total Total Artists:</span>
            <span class="insight-value">${topArtists.totalArtists}</span>
          </div>
          <div class="insight-item">
            <span class="insight-label">Track-to-Artist Ratio:</span>
            <span class="insight-value">${(
              playlist.totalTracks / topArtists.totalArtists
            ).toFixed(2)} tracks/artist</span>
          </div>
        </div>

        <h3 class="section-subtitle">Top 10 Most Frequent Artists</h3>
        <ol class="track-list artist-list">
          ${topArtists.artistsFrequency
            .slice(0, 10)
            .map(
              (item, index) => `
            <li class="track-item">
              <span class="track-number">${index + 1}.</span>
              <span class="track-name">${item.name}</span>
              <span class="track-popularity">${item.count} tracks</span>
            </li>
          `
            )
            .join("")}
        </ol>
      </section>
      
      ${
        insights.explicitTracks > 0
          ? `
      <section class="section">
        <h2 class="section-title">Content Information</h2>
        <div class="insight-item">
          <span class="insight-label">Explicit Tracks:</span>
          <span class="insight-value">
            ${insights.explicitTracks} of ${playlist.totalTracks} 
            (${((insights.explicitTracks / playlist.totalTracks) * 100).toFixed(
              1
            )}%)
          </span>
        </div>
      </section>
      `
          : ""
      }

      <section class="section">
        <h2 class="section-title">Top 10 Most Popular Tracks</h2>
        <ol class="track-list">
          ${topTracks.mostPopularTracks
            .map(
              (track, index) => `
            <li class="track-item">
              <span class="track-number">${index + 1}.</span>
              <span class="track-name">${track.name}</span>
              <span class="track-popularity">${track.popularity}</span>
            </li>
          `
            )
            .join("")}
        </ol>
      </section>

      <section class="section">
        <h2 class="section-title">Top 10 Longest Tracks</h2>
        <ol class="track-list">
          ${topTracks.longestTracks
            .map(
              (track, index) => `
            <li class="track-item">
              <span class="track-number">${index + 1}.</span>
              <span class="track-name">${track.name}</span>
              <span class="track-duration">${track.duration.timeString}</span>
            </li>
          `
            )
            .join("")}
        </ol>
      </section>

      <footer class="footer">
        <p>Report generated on ${date}</p>
      </footer>
    </div>
  `;
};
