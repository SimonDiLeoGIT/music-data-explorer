import app from "../src/app.js";
import serverless from "serverless-http";

console.log("🚀 Serverless function starting");
console.log("🔑 Environment variables:", {
  spotify_id: process.env.SPOTIFY_API_CLIENT_ID ? "✅" : "❌",
  spotify_secret: process.env.SPOTIFY_API_CLIENT_SECRET ? "✅" : "❌",
  spotify_base_url: process.env.SPOTIFY_API_BASE_URL ? "✅" : "❌",
  lastfm_key: process.env.LASTFM_API_KEY ? "✅" : "❌",
  cors_origins: process.env.CORS_ALLOWED_ORIGINS ? "✅" : "❌",
});

const handler = serverless(app);

export default handler;
