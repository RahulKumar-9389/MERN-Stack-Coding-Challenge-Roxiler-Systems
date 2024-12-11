import express from "express";
import { barChart } from "../controllers/barchartController.js";

const router = express.Router();

router.get("/barchart", barChart);

export default router;
