import express from "express";
import { generateStore } from "../controllers/storeAiController.js";

const storeAiRoutes = express.Router();

storeAiRoutes.post("/generate", generateStore);

export { storeAiRoutes };
