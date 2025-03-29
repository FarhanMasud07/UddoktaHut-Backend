import {
  generateOtp,
  passwordHashing,
  saveOtp,
  verifyOtp,
} from "../lib/utils.js";
import { Role, UserRole } from "../models/RootModel.js";
import { env } from "../config/env.js";
import { User } from "../models/RootModel.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.UDDOKTAHUT_EMAIL,
    pass: env.ZOHO_APP_PASSWORD,
  },
});

const sendEmailVarification = async (data) => {
  const { email, name, password } = data;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) throw new Error("User already exist");

  const { hashedPassword } = await passwordHashing(password);
  const otp = generateOtp();
  saveOtp({ identifier: email, name, password: hashedPassword }, Number(otp));
  const mailOptions = {
    from: "UddoktaHut <info@uddoktahut.com>",
    to: email,
    subject: "Please verify your email",
    html: `
  <main style="display: flex; flex-direction: column; margin: 0 auto">
    <p style="font-weight: 700; font-size: 20px">Welcome to UddoktaHut</p>
    <p style="font-weight: 500; font-size: 16px">Your otp is: <b>${otp}</b></p>
  </main>
`,
  };
  return await transporter.sendMail(mailOptions);
};

const verifyEmailToProceed = async (data) => {
  const { identifier, otp } = data;
  let record = verifyOtp(identifier, Number(otp));
  if (record) {
    const { name, password } = record;
    if (!name || !password) throw new Error("No name or password found!");
    return await User.create({ email: identifier, name, password });
  }
  return null;
};

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
  const { identifier, otp } = data;
  let record = verifyOtp(identifier, Number(otp));
  if (record) {
    const { name, password } = record;
    if (!name || !password) throw new Error("No name or password found!");
    return await User.create({ name, password, phone_number: identifier });
  }
  return null;
};

const assignRoleToUser = async (userId, roleId) => {
  const validRole = await Role.findOne({
    where: {
      id: roleId,
    },
  });

  if (!validRole) throw new Error("Role is invalid");

  await UserRole.create({ user_id: userId, role_id: roleId });
};

export {
  sendEmailVarification,
  verifyEmailToProceed,
  sendSmsProvider,
  verifySmsProvider,
  assignRoleToUser,
};
