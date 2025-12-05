import express from "express";
import { trackDetails } from "../controllers/track.controller.js";

const router = express.Router();

router.get("/:id", trackDetails);

export default router;
