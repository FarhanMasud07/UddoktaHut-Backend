import express from "express";
import {
  subscribedStoreSchema,
  subscriptionSchema,
} from "../validations/subscriptionSchema.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  subscribedStore,
  subscriptionStatus,
} from "../controllers/subscriptionController.js";

const subscriptionRoutes = express.Router();

subscriptionRoutes.post(
  "/status",
  validate(subscriptionSchema),
  subscriptionStatus
);
subscriptionRoutes.get(
  "/store/:storeName",
  validate(subscribedStoreSchema, "params"),
  subscribedStore
);

export { subscriptionRoutes };
