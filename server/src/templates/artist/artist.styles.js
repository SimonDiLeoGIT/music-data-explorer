export const artistReportStyles = `
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
    border-bottom: 3px solid #3b82f6; /* Color AZUL para Artista */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .artist-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid #3b82f6;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 4px;
    color: #111827;
  }

  .subtitle {
    font-size: 18px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .metadata {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 10px;
  }
  
  .genre-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 5px;
  }

  .genre-tag {
    font-size: 10px;
    color: #3b82f6;
    background: #eff6ff;
    padding: 3px 8px;
    border-radius: 9999px; /* rounded-full */
    border: 1px solid #dbeafe;
  }


  /* Sections */
  .section {
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #3b82f6; /* Color principal de la sección */
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e5e7eb;
  }

  .section-title span {
    font-size: 12px;
    font-weight: normal;
    color: #6b7280;
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
  
  /* Biography */
  .artist-bio {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    font-size: 11px;
    line-height: 1.7;
    color: #4b5563;
  }

  /* Track List */
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
    color: #3b82f6; /* Color principal para números */
    display: inline-block;
    width: 30px;
  }

  .track-name {
    display: inline;
    color: #374151;
  }

  .track-popularity {
    color: #6b7280;
    font-weight: 600;
    float: right;
  }

  /* Discography Grid */
  .albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  
  .album-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: #f9fafb;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  
  .album-cover-small {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  
  .album-name {
    font-size: 12px;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  
  .album-metadata {
    font-size: 10px;
    color: #6b7280;
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
