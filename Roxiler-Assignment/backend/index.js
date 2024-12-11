import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { useDatabase } from "./hooks/databaseHook.js";
import databaseIntitialization from "./routes/dbInitRoute.js";
import transactionRoute from "./routes/transactionRoutes.js";
import statisticRoute from "./routes/statisticsRoute.js";
import barchartRoute from "./routes/barchartRoute.js";
import piechartRoute from "./routes/piechartRoute.js"
import { combinedData } from "./controllers/combinedDataController.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection
useDatabase();

app.use("/api", databaseIntitialization);
app.use("/data", transactionRoute);
app.use("/data", statisticRoute);
app.use("/charts", barchartRoute);
app.use("/charts", piechartRoute);
app.use("/combinedData", combinedData);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
