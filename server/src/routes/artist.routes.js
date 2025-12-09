import express from "express";
import { artistData } from "../controllers/artist.controller.js";

const router = express.Router();

router.get("/:id", artistData);

export default router;
