import express from "express";
import {
  getPlaylistData,
  getPlaylistInsights,
  getPlaylistTopTracks,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.get("/:id", getPlaylistData);
router.get("/:id/insights", getPlaylistInsights);
router.get("/:id/top-tracks", getPlaylistTopTracks);

export default router;
