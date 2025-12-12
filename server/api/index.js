import app from "../src/app.js";
import serverless from "serverless-http";

export default async function handler(req, res) {
  console.log("Serverless handler started");
  console.log("origins:", process.env.CORS_ALLOWED_ORIGINS);

  return serverless(app)(req, res);
}
