import {
  sendEmailVarification,
  verifyEmailToProceed,
} from "../services/emailProviderService.js";

const sendEmail = async (req, res, next) => {
  try {
    await sendEmailVarification(req.body);
    res
      .status(200)
      .json({ message: "Otp sended successfully please check you email" });
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

export { sendEmail, verifyEmail };
