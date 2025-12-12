export const playlistReportStyles = `
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
    border-bottom: 3px solid #10b981; /* Color verde para diferenciar de álbum (púrpura) */
  }
  
  /* CLASE NUEVA: Imagen de la playlist */
  .playlist-cover {
    width: 100%;
    max-width: 200px;
    height: auto;
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
    color: #10b981; /* Color del subtítulo */
  }

  .subtitle {
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  
  .section-subtitle {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-top: 15px;
    margin-bottom: 10px;
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
    color: #10b981; /* Color principal de la sección */
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e5e7eb;
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

  /* Insight List */
  .insight-list {
    display: block;
  }

  .insight-item {
    display: block; 
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

  /* Track List & Artist List */
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
  }

  .track-number {
    font-weight: bold;
    color: #10b981; /* Color principal para números */
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
