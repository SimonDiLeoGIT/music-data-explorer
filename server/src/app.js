import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(",")
      : "*",
    credentials: true,
  })
);

console.log("App.js loaded, registering routes...");

app.use("/api", routes);

console.log("Routes registered");

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

export default app;
