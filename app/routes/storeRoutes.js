import express from "express";
import { validate } from "../middleware/validateMiddleware.js";
import { storeSchema } from "../validations/storeValidation.js";
import { verifiedStore } from "../controllers/storeController.js";

const storeRoutes = express.Router();

storeRoutes.post("/verified-store", validate(storeSchema), verifiedStore);

export { storeRoutes };
