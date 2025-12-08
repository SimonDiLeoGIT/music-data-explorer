import express from "express";
import { getPlaylistInsights } from "../controllers/playlist.controller.js";

const router = express.Router();

router.get("/:id/insights", getPlaylistInsights);

export default router;
