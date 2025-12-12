import express from "express";
import {
  artistData,
  exportArtistReport,
} from "../controllers/artist.controller.js";

const router = express.Router();

router.get("/:id", artistData);
router.post("/:id/insights/export", exportArtistReport);

export default router;
