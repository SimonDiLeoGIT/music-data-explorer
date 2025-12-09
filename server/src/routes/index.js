import express from "express";
import albumRoutes from "./album.routes.js";
import genreRoutes from "./genre.routes.js";
import playlistRoutes from "./playlist.routes.js";
import searchRoutes from "./search.routes.js";
import artistRoutes from "./artist.routes.js";

const router = express.Router();

router.use("/albums", albumRoutes);
router.use("/genres", genreRoutes);
router.use("/playlists", playlistRoutes);
router.use("/search", searchRoutes);
router.use("/artists", artistRoutes);

export default router;
