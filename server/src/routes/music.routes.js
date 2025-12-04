import { Router } from "express";
import { albumInsights, albumTracks } from "../controllers/music.controller.js";

const router = Router();

router.get("/album/:id/insights", albumInsights);
router.get("/album/:id/tracks", albumTracks);

export default router;
