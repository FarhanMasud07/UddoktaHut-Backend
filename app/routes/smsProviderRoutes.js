import express from "express";
import { sendSms, smsVerify } from "../controllers/smsProviderController.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  smsProviderSchema,
  smsProviderVerifySchema,
} from "../validations/smsProvider.js";

const smsProviderRoutes = express.Router();

smsProviderRoutes.post("/send", validate(smsProviderSchema), sendSms);
smsProviderRoutes.post("/verify", validate(smsProviderVerifySchema), smsVerify);

export { smsProviderRoutes };
