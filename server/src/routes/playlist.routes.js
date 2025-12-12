import express from "express";
import {
  exportPlaylistInsights,
  getPlaylistData,
  getPlaylistInsights,
  getPlaylistTopArtists,
  getPlaylistTopTracks,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.get("/:id", getPlaylistData);
router.get("/:id/insights", getPlaylistInsights);
router.post("/:id/insights/export", exportPlaylistInsights);
router.get("/:id/top-tracks", getPlaylistTopTracks);
router.get("/:id/top-artists", getPlaylistTopArtists);

export default router;
