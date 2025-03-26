import { env } from "../config/env.js";
import {
  generateOtp,
  passwordHashing,
  saveOtp,
  verifyOtp,
} from "../lib/utils.js";
import { User } from "../models/RootModel.js";

const sendSmsProvider = async (data) => {
  const { phoneNumber, name, password } = data;

  const existUser = await User.findOne({
    where: { phone_number: phoneNumber },
  });
  if (existUser) throw new Error("User already exist");

  const { hashedPassword } = await passwordHashing(password);
  const otp = generateOtp();
  saveOtp(
    { identifier: phoneNumber, name, password: hashedPassword },
    Number(otp)
  );
  const response = await fetch(env.SMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: env.SMS_API_KEY,
      type: env.SMS_TYPE,
      number: phoneNumber,
      senderid: env.SMS_SENDER_ID,
      message: `Your otp for uddoktahut is: ${otp}`,
    }),
  });
  return await response.json();
};

const verifySmsProvider = async (data) => {
  const { phoneNumber, otp } = data;
  let record = verifyOtp(phoneNumber, Number(otp));
  if (record) {
    const { name, password } = record;
    if (!name || !password) throw new Error("No name or password found!");
    return await User.create({ name, password, phone_number: phoneNumber });
  }
  return null;
};

export { sendSmsProvider, verifySmsProvider };
