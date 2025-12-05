import express from "express";
import {
  albumInsights,
  albumsPopularityInsights,
  albumTracks,
  newReleases,
} from "../controllers/album.controller.js";

const router = express.Router();

router.get("/browse/new-releases", newReleases);
router.get("/insights", albumsPopularityInsights);
router.get("/:id/insights", albumInsights);
router.get("/:id/tracks", albumTracks);

export default router;
