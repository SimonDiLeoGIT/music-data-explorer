import express from "express";
import {
  exportGenreReport,
  getTopGenreAlbums,
  getTopGenreArtists,
  getTopGenres,
  getTopGenreTracks,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/top-ten", getTopGenres);
router.post("/insights/export", exportGenreReport);
router.get("/:genreTag/top-artists", getTopGenreArtists);
router.get("/:genreTag/top-tracks", getTopGenreTracks);
router.get("/:genreTag/top-albums", getTopGenreAlbums);

export default router;
