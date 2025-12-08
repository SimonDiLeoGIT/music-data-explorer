import express from "express";
import {
  albumInsights,
  albumsPopularityInsights,
  albumTracks,
  newReleases,
  search,
} from "../controllers/album.controller.js";

const router = express.Router();

router.get("/browse/new-releases", newReleases);
router.post("/popularity-insights", albumsPopularityInsights);
router.get("/:id/insights", albumInsights);
router.get("/:id/tracks", albumTracks);
router.get("/search", search);

export default router;
