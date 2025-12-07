import express from "express";
import {
  getTopGenreAlbums,
  getTopGenreArtists,
  getTopGenres,
  getTopGenreTracks,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/top-ten", getTopGenres);
router.get("/:genreTag/top-artists", getTopGenreArtists);
router.get("/:genreTag/top-tracks", getTopGenreTracks);
router.get("/:genreTag/top-albums", getTopGenreAlbums);

export default router;
