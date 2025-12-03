import { Router } from "express";
import {
  getAlbumInsights,
  getArtistStats,
} from "../controllers/music.controller.js";

const router = Router();

router.get("/album/:id/insights", getAlbumInsights);
router.get("/artist/:id/stats", getArtistStats);

export default router;
