import express from "express";
import trackRoutes from "./track.routes.js";
import albumRoutes from "./album.routes.js";
import genderRoutes from "./gender.routes.js";
// import playlistRoutes from "./playlist.routes.js";

const router = express.Router();

router.use("/albums", albumRoutes);
router.use("/genders", genderRoutes);
// router.use("/playlists", playlistRoutes);
router.use("/tracks", trackRoutes);

export default router;
