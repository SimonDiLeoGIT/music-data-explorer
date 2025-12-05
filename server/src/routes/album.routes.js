import express from "express";
import { albumInsights, albumTracks } from "../controllers/album.controller.js";

const router = express.Router();

router.get("/:id/insights", albumInsights);
router.get("/:id/tracks", albumTracks);

export default router;
