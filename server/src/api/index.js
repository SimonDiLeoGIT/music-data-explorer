import app from "../src/app.js";
import serverless from "serverless-http";

export const GET = serverless(app);
export const POST = serverless(app);
export const PUT = serverless(app);
export const DELETE = serverless(app);
