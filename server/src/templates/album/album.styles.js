export const albumReportStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 12px;
    line-height: 1.6;
    color: #1f2937;
    /* background: white; */
  }

  .container {
    max-width: 100%;
    padding: 20px;
  }

  /* Header */
  .header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid #a855f7;
  }
  
  .album-cover {
    width: 100%;
    max-width: 200px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #111827;
  }

  .title span {
    font-size: 20px;
    color: #a855f7;
  }

  .subtitle {
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .metadata {
    font-size: 11px;
    color: #9ca3af;
  }

  /* Sections */
  .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #a855f7;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e5e7eb;
  }

  /* Stats Grid - Cambiado de grid a flexbox */
  .stats-grid {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .stat-card {
    flex: 1;
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }

  .stat-label {
    font-size: 11px;
    color: #6b7280;
    margin-bottom: 5px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #111827;
  }

  .stat-value-small {
    font-size: 16px;
    font-weight: bold;
    color: #111827;
  }

  /* Insight List */
  .insight-list {
    display: block; /* Cambiado de flex */
  }

  .insight-item {
    display: block; /* Cambiado de flex */
    background: #f9fafb;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .insight-label {
    font-weight: 600;
    color: #374151;
    display: inline;
  }

  .insight-value {
    color: #6b7280;
    float: right;
  }

  /* Track List */
  .track-list {
    list-style: none;
    counter-reset: track-counter;
  }

  .track-item {
    display: block; /* Cambiado de flex */
    padding: 8px 12px;
    margin-bottom: 6px;
    background: #f9fafb;
    border-radius: 6px;
    overflow: hidden;
  }

  .track-number {
    font-weight: bold;
    color: #a855f7;
    display: inline-block;
    width: 30px;
  }

  .track-name {
    display: inline;
    color: #374151;
  }

  .track-popularity,
  .track-duration {
    color: #6b7280;
    font-weight: 600;
    float: right;
  }

  /* Artist Info */
  .artist-info {
    display: block;
  }

  .artist-stats {
    display: flex; /* Mantenemos flex aquí */
    gap: 15px;
    margin-bottom: 15px;
  }

  .artist-stat {
    flex: 1;
    background: #f9fafb;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
  }

  .artist-bio {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    font-size: 11px;
    line-height: 1.7;
    color: #4b5563;
  }

  .artist-bio p {
    margin-bottom: 10px;
  }

  .artist-bio p:last-child {
    margin-bottom: 0;
  }

  /* Footer */
  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
    font-size: 10px;
    color: #9ca3af;
  }

  /* Print optimizations */
  @media print {
    .section {
      page-break-inside: avoid;
    }
  }
`;
