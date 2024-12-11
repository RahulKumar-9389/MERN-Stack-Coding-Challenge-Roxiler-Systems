import express from "express";
import { pieChart } from "../controllers/piechartController.js";

const router = express.Router();

router.get("/piechart", pieChart);

export default router;
