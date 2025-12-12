import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS.split(","),
  })
);

app.use("/api", routes);

export default app;
