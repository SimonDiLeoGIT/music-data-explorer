import dotenv from "dotenv";
dotenv.config();

import app from "../src/app.js";
import serverless from "serverless-http";

const handler = serverless(app);

export default handler;
