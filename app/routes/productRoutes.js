import { Router } from "express";
import {
  getAllProducts,
  addProduct,
  editProduct,
} from "../controllers/productController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  paginationQuerySchema,
  productUpdateSchema,
} from "../validations/paginationSchema.js";
import { productCreateSchema } from "../validations/productSchema.js";

const router = Router();

// Only allow GET, and only for authenticated users, with query validation

router.get(
  "/",
  authenticateUser,
  validate(paginationQuerySchema, "query"),
  getAllProducts
);

router.post(
  "/",
  authenticateUser,
  validate(productCreateSchema, "body"),
  addProduct
);

router.patch(
  "/:id",
  authenticateUser,
  validate(productUpdateSchema, "body"),
  editProduct
);

export default router;
