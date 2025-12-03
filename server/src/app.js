import express from "express";
import musicRoutes from "./routes/music.routes.js";

const app = express();
app.use(express.json());

app.use("/api/music", musicRoutes);

export default app;
