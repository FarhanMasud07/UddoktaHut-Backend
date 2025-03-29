import express from "express";
import { validate } from "../middleware/validateMiddleware.js";
import { userRolesSchema } from "../validations/userRoleSchema.js";
import {
  addRolesToUser,
  sendEmail,
  sendSms,
  smsVerify,
  verifyEmail,
} from "../controllers/userController.js";
import {
  emailproviderSchema,
  emailVerifySchema,
} from "../validations/emailProvider.js";
import {
  smsProviderSchema,
  smsProviderVerifySchema,
} from "../validations/smsProvider.js";

const userRoutes = express.Router();

userRoutes.post("/mail/send", validate(emailproviderSchema), sendEmail);
userRoutes.post("/mail/verify", validate(emailVerifySchema), verifyEmail);

userRoutes.post("/sms/send", validate(smsProviderSchema), sendSms);
userRoutes.post("/sms/verify", validate(smsProviderVerifySchema), smsVerify);

userRoutes.post(
  "/assign-role",
  validate(userRolesSchema),
  //authenticateUser,
  addRolesToUser
);

export { userRoutes };
