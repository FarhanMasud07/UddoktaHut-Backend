import {
  sendSmsProvider,
  verifySmsProvider,
} from "../services/smsProviderService.js";

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

export { sendSms, smsVerify };
