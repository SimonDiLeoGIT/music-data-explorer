import express from "express";
import {
  getPlaylistData,
  getPlaylistInsights,
  getPlaylistTopArtists,
  getPlaylistTopTracks,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.get("/:id", getPlaylistData);
router.get("/:id/insights", getPlaylistInsights);
router.get("/:id/top-tracks", getPlaylistTopTracks);
router.get("/:id/top-artists", getPlaylistTopArtists);

export default router;
