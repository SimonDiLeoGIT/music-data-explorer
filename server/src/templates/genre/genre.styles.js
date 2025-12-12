export const genreReportStyles = `
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
  }

  .container {
    max-width: 100%;
    padding: 20px;
  }

  /* Header */
  .header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid #84cc16; /* Color VERDE CLARO para Género */
  }
  
  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #111827;
  }

  .title span {
    font-size: 20px;
    color: #84cc16;
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
  
  .divider {
    text-align: center;
    font-size: 14px;
    color: #84cc16;
    margin: 30px 0;
    font-weight: bold;
    border-top: 1px dashed #e5e7eb;
    border-bottom: 1px dashed #e5e7eb;
    padding: 10px 0;
  }

  /* Sections */
  .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #84cc16; /* Color principal de la sección */
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e5e7eb;
  }

  /* Top Genres Global List */
  .top-genres-list {
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .genre-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid #f3f4f6;
    background: #ffffff;
  }

  .genre-row.header-row {
    background: #e5e7eb;
    font-weight: bold;
    color: #374151;
    border-bottom: 2px solid #d1d5db;
  }
  
  .genre-row.empty {
    color: #9ca3af;
    text-align: center;
    font-style: italic;
    justify-content: center;
  }
  
  .genre-name {
    flex-basis: 70%;
    font-weight: 500;
  }
  
  .genre-count {
    flex-basis: 30%;
    text-align: right;
    color: #4b5563;
  }

  /* Stats Grid */
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
    border: 1px solid #e5e7eb;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    padding: 4px 0;
  }


  /* Track List (Usada para Artistas, Álbumes y Tracks) */
  .track-list {
    list-style: none;
    counter-reset: track-counter;
  }

  .track-item {
    display: block; 
    padding: 8px 12px;
    margin-bottom: 6px;
    background: #f9fafb;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  
  .track-item.empty {
    color: #9ca3af;
    text-align: center;
    font-style: italic;
  }

  .track-number {
    font-weight: bold;
    color: #84cc16; /* Color principal para números */
    display: inline-block;
    width: 30px;
  }

  .track-name {
    display: inline;
    color: #374151;
    font-weight: 600;
  }
  
  .track-artist {
    display: inline;
    color: #6b7280;
    font-style: italic;
    font-weight: 400;
  }

  .track-stat {
    color: #6b7280;
    font-weight: 600;
    float: right;
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
`;
