import express from "express";
import { validate } from "../middleware/validateMiddleware.js";
import {
  storeSchema,
  storeUpdateSchema,
} from "../validations/storeValidation.js";
import {
  getPublicStoreProducts,
  updateTemplate,
  getOwnerStore,
} from "../controllers/storeController.js";
import { paginationQuerySchema } from "../validations/paginationSchema.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  checkOwnerSubscription,
  checkStoreSubscription,
} from "../middleware/subscriptionMiddleware.js";

const storeRoutes = express.Router();

// Public routes
storeRoutes.get(
  "/:storeName/products",
  validate(storeSchema, "params"),
  checkStoreSubscription,
  validate(paginationQuerySchema, "query"),
  getPublicStoreProducts
);

storeRoutes.get(
  "/:storeName",
  authenticateUser,
  checkOwnerSubscription,
  validate(storeSchema, "params"),
  getOwnerStore
);

// Protected routes
storeRoutes.patch(
  "/:storeName/template",
  authenticateUser,
  checkOwnerSubscription,
  validate(storeSchema, "params"),
  validate(storeUpdateSchema, "body"),
  updateTemplate
);

export { storeRoutes };
