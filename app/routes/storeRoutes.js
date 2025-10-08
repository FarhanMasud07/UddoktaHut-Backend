import express from "express";
import { validate } from "../middleware/validateMiddleware.js";
import { storeSchema } from "../validations/storeValidation.js";
import { getPublicStoreProducts } from "../controllers/storeController.js";
import { paginationQuerySchema } from "../validations/paginationSchema.js";

const storeRoutes = express.Router();

storeRoutes.get(
  "/:storeName/products",
  validate(storeSchema, "params"),
  validate(paginationQuerySchema, "query"),
  getPublicStoreProducts
);
export { storeRoutes };
