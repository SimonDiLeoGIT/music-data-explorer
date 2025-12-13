# 🎵 Music Data Explorer

Music Data Explorer is a web application that consumes public music APIs to uncover and visualize interesting and unexpected insights about songs, artists, and albums through interactive charts.

---

## 🚀 Live Demo

👉 [Music Data Explorer](https://music-data-explorer-h232.vercel.app/)

---

## 💡 Core Idea

The project focuses on analyzing **popularity, engagement, and discovery metrics** from public music APIs to uncover meaningful insights about songs, artists, albums, and genres.

### ✨ Features

- 🎶 **Album & Playlist song analysis**  
  Identify the **longest and shortest tracks**, as well as the **most and least popular songs** within an album or playlist.

- 📈 **Popularity and audience metrics**  
  Visualize key metrics such as:
  - Number of plays
  - Number of listeners  

- 🎤 **Artist popularity analysis**  
  Explore an artist’s **most popular tracks**, including:
  - Total plays
  - Monthly listeners

- 🧠 **Artist information via Last.fm**  
  Enrich artist data using Last.fm to display:
  - Artist biography and metadata
  - Complete discography (albums)

- 🎼 **Genre exploration**  
  Discover the **most popular music genres** and explore:
  - Top artists per genre
  - Most popular albums
  - Most popular tracks

---

## 🧰 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![Spotify](https://img.shields.io/badge/Spotify-1DB954?logo=spotify&logoColor=white)
![Last.fm](https://img.shields.io/badge/Last.fm-D51007?logo=lastdotfm&logoColor=white)

---

## ⚙️ Setup

#### Clone repository
```bash
git clone https://github.com/SimonDiLeoGIT/music-data-explorer.git
```

### Backend

#### Navigate to the server directory
```bash
cd server/
```

#### Environment Variables
```bash
# Copy .env.example file and rename
cp .env.example .env
```

#### Configure the environment variables
```bash
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

#### Spotify API Credentials
1. Create a Spotify Developer App at https://developer.spotify.com/dashboard
2. Copy your Client ID and Client Secret
3. Add the following variables to your .env file:
```bash
SPOTIFY_API_CLIENT_ID=your_client_id
SPOTIFY_API_CLIENT_SECRET=your_client_secret
SPOTIFY_API_REDIRECT_URI=http://localhost:3000
SPOTIFY_API_BASE_URL=https://api.spotify.com/v1
SPOTIFY_API_AUTH_URL=https://accounts.spotify.com/api/token
```

#### Last.fm API Credentials
1. Create a Last.fm API account at https://www.last.fm/api
2. Add the following variables to your .env file:
```bash
LASTFM_API_KEY=your_api_key
LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
```

#### Install dependencies
```bash
npm install
```

#### Run backend
```bash
node index
```

### Frontend

#### Navigate to the client directory
```bash
cd client/
```

#### Environment Variables
```bash
# Copy .env.example file and rename
cp .env.example .env
```

#### Configure the environment variables
```bash
VITE_SERVER_HOST=localhost
VITE_SERVER_PORT=3000
VITE_SERVER_BASE_URL=http://localhost:3000/api
```

#### Install dependencies
```bash
pnpm install
```

#### Run client
```bash
pnpm run dev
```
