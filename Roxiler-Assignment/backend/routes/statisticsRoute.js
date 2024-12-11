import express from "express";
import { statistics } from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/statistics", statistics);

export default router;
