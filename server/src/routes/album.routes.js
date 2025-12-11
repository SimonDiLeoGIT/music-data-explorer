import express from "express";
import {
  albumData,
  albumInsights,
  getAlbumTopTracks,
  exportAlbumInsights,
  newReleases,
} from "../controllers/album.controller.js";

const router = express.Router();

router.get("/browse/new-releases", newReleases);
router.get("/:id", albumData);
router.get("/:id/insights", albumInsights);
router.post("/:id/insights/export", exportAlbumInsights);
router.get("/:id/top-tracks", getAlbumTopTracks);

export default router;
