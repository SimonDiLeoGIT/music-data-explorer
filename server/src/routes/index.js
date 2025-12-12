import express from "express";
import albumRoutes from "./album.routes.js";
import genreRoutes from "./genre.routes.js";
import playlistRoutes from "./playlist.routes.js";
import searchRoutes from "./search.routes.js";
import artistRoutes from "./artist.routes.js";

console.log("Loading routes/index.js...");

const router = express.Router();

console.log("Registering album routes...");
router.use("/albums", albumRoutes);

console.log("Registering genre routes...");
router.use("/genres", genreRoutes);

console.log("Registering playlist routes...");
router.use("/playlists", playlistRoutes);

console.log("Registering search routes...");
router.use("/search", searchRoutes);

console.log("Registering artist routes...");
router.use("/artists", artistRoutes);

export default router;
