import serverless from "serverless-http";

console.log("🚀 Serverless function starting");

let app;

export default async function handler(req, res) {
  console.log(`${req.method} ${req.url}`);

  // Health check rápido
  if (req.url === "/api/health" || req.url === "/health") {
    return res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  }

  // Lazy load app solo cuando se necesita
  if (!app) {
    console.log("Loading app for the first time...");
    try {
      const appModule = await import("../src/app.js");
      app = appModule.default;
      console.log("App loaded successfully");
    } catch (error) {
      console.error("Error loading app:", error);
      return res.status(500).json({
        error: "Failed to load app",
        message: error.message,
      });
    }
  }

  console.log("Passing to Express...");
  const serverlessHandler = serverless(app);

  try {
    return await serverlessHandler(req, res);
  } catch (error) {
    console.error("Handler error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
