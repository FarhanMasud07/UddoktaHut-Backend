import express from "express";
import { validate } from "../middleware/validateMiddleware.js";
import { loginSchema } from "../validations/loginValidation.js";
import {
  loginUser,
  logout,
  refreshToken,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/login", validate(loginSchema), loginUser);
authRoutes.get("/logout", logout);
authRoutes.post("/refresh", refreshToken);

export { authRoutes };
