import app from "../src/app.js";
import serverless from "serverless-http";

console.log("🚀 Serverless function starting");
export default async function handler(req, res) {
  console.log(`📍 ${req.method} ${req.url}`);

  // Health check que bypasea todo
  if (req.url === "/api/health" || req.url === "/health") {
    console.log("✅ Health check - responding directly");
    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      env: {
        spotify_id: !!process.env.SPOTIFY_API_CLIENT_ID,
        spotify_secret: !!process.env.SPOTIFY_API_CLIENT_SECRET,
        lastfm_key: !!process.env.LASTFM_API_KEY,
      },
    });
  }

  console.log("⏳ Passing to serverless handler...");
  const serverlessHandler = serverless(app);

  try {
    return await serverlessHandler(req, res);
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

// const handler = serverless(app);

// export default handler;
