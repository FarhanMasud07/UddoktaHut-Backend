import express from "express";
import {
  sendEmail,
  verifyEmail,
} from "../controllers/emailProviderController.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  emailproviderSchema,
  emailVerifySchema,
} from "../validations/emailProvider.js";

const emailProviderRoute = express.Router();
emailProviderRoute.post("/send", validate(emailproviderSchema), sendEmail);
emailProviderRoute.post("/verify", validate(emailVerifySchema), verifyEmail);
export { emailProviderRoute };
