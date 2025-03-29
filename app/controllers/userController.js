import {
  sendEmailVarification,
  verifyEmailToProceed,
  sendSmsProvider,
  verifySmsProvider,
  assignRoleToUser,
} from "../services/userService.js";

const sendEmail = async (req, res, next) => {
  try {
    await sendEmailVarification(req.body);
    res.status(200).json({
      success: true,
      message: "Otp sended successfully please check you email",
    });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const verifiedRecord = await verifyEmailToProceed(req.body);
    if (verifiedRecord)
      return res.status(200).json({
        verified: true,
        message: "Email verified successfully",
        status: 200,
      });
    return res.status(400).json({
      verified: false,
      error: "Invalid or expired otp",
      status: 400,
    });
  } catch (err) {
    next(err);
  }
};

const sendSms = async (req, res, next) => {
  try {
    const result = await sendSmsProvider(req.body);
    if (result.response_code === 202)
      return res.status(result.response_code).json({
        success: true,
        message: result.success_message,
      });
    return res
      .status(result.response_code)
      .json({ error: result.error_message });
  } catch (err) {
    next(err);
  }
};

const smsVerify = async (req, res, next) => {
  try {
    const verifiedRecord = await verifySmsProvider(req.body);
    if (!verifiedRecord)
      return res
        .status(400)
        .json({ verified: false, error: "Invalid or expired otp" });
    return res
      .status(200)
      .json({ verified: true, message: "Otp verified ✅", status: 200 });
  } catch (err) {
    next(err);
  }
};

const addRolesToUser = async (req, res, next) => {
  try {
    const { userId, roles } = req.body;
    const userRoles = await assignRoleToUser(userId, roles);
    res.status(201).json({ userRoles, success: true });
  } catch (err) {
    next(err);
  }
};

export { sendEmail, verifyEmail, sendSms, smsVerify, addRolesToUser };
