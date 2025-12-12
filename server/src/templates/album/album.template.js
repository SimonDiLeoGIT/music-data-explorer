import {
  formatNumber,
  formatNumberWithCommas,
} from "../../utils/formatNumbers.js";

export const generateAlbumReportHTML = (album, insights, topTracks, artist) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <div class="container">
      <!-- Header -->
      <header class="header">
        <img class="album-cover" src="${album.cover}" alt="${album.name}" />
        <h1 class="title">${album.name} <span>Album</span></h1>
        <p class="subtitle">${artist.name}</p>
        <p class="metadata">
          ${album.releaseDate} • ${album.totalTracks} tracks • ${
    insights.time.totalDuration
  }
        </p>
      </header>

      <!-- Statistics Overview -->
      <section class="section">
        <h2 class="section-title">Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <p class="stat-label">Listeners</p>
            <p class="stat-value" title="${formatNumberWithCommas(
              album.stats.listeners
            )}">
                  ${formatNumber(album.stats.listeners)}
            </p>
          </div>
          <div class="stat-card">
            <p class="stat-label">Plays</p>
            <p class="stat-value" title="${formatNumberWithCommas(
              album.stats.playcount
            )}">
              ${formatNumber(album.stats.playcount)}
            </p>
          </div>
        </div>
      </section>

      <!-- Duration Analysis -->
      <section class="section">
        <h2 class="section-title">Duration Analysis</h2>
        <div class="insight-list">
          <div class="insight-item">
            <span class="insight-label">Total Duration:</span>
            <span class="insight-value">${insights.time.totalDuration}</span>
          </div>
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

      <!-- Popularity -->
      <section class="section">
        <h2 class="section-title">Popularity</h2>
        <div class="insight-list">
          <div class="insight-item">
            <span class="insight-label">Average Popularity:</span>
            <span class="insight-value">${insights.popularity.average}</span>
          </div>
          <div class="insight-item">
            <span class="insight-label">Most Popular Track:</span>
            <span class="insight-value">
              ${insights.popularity.mostPopularTrack.name} (${
    insights.popularity.mostPopularTrack.popularity
  })
            </span>
          </div>
          <div class="insight-item">
            <span class="insight-label">Least Popular Track:</span>
            <span class="insight-value">
              ${insights.popularity.leastPopularTrack.name} (${
    insights.popularity.leastPopularTrack.popularity
  })
            </span>
          </div>
        </div>
      </section>

      <!-- Explicit Tracks -->
      ${
        insights.explicitTracks > 0
          ? `
      <section class="section">
        <h2 class="section-title">Content Information</h2>
        <div class="insight-item">
          <span class="insight-label">Explicit Tracks:</span>
          <span class="insight-value">
            ${insights.explicitTracks} of ${album.totalTracks} 
            (${((insights.explicitTracks / album.totalTracks) * 100).toFixed(
              1
            )}%)
          </span>
        </div>
      </section>
      `
          : ""
      }

      <!-- Top 10 Most Popular Tracks -->
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

      <!-- Top 10 Longest Tracks -->
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

      <!-- Artist Info -->
      <section class="section">
        <h2 class="section-title">About ${artist.name}</h2>
        <div class="artist-info">
          <div class="artist-stats">
            <div class="artist-stat">
              <p class="stat-label">Listeners</p>
              <p class="stat-value-small">
                ${
                  artist.listeners !== null
                    ? formatNumber(artist.listeners)
                    : "-"
                }
              </p>
            </div>
            <div class="artist-stat">
              <p class="stat-label">Plays</p>
              <p class="stat-value-small">
                ${
                  artist.playcount !== null
                    ? formatNumber(artist.playcount)
                    : "-"
                }
              </p>
            </div>
          </div>
          <div class="artist-bio">
            ${artist.bio}
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>Report generated on ${date}</p>
      </footer>
    </div>
  `;
};
