import express from "express";
import { initializeDb } from "../controllers/initializeDatabase.js";

const router = express.Router();

router.get("/initialize-database", initializeDb);


export default router;