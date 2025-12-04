import express from "express";
import cors from "cors";
import musicRoutes from "./routes/music.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.CORS_ALLOWED_ORIGINS.split(",") || "http://localhost:3000",
  })
);

app.use("/api/music", musicRoutes);

export default app;
