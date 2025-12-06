import express from "express";
import {
  getTopGenderAlbums,
  getTopGenderArtists,
  getTopGenders,
  getTopGenderTracks,
} from "../controllers/gender.controller.js";

const router = express.Router();

router.get("/top-ten", getTopGenders);
router.get("/:genderTag/top-artists", getTopGenderArtists);
router.get("/:genderTag/top-tracks", getTopGenderTracks);
router.get("/:genderTag/top-albums", getTopGenderAlbums);

export default router;
