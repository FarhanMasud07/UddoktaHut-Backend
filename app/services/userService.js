import jwt from "jsonwebtoken";
import {
  generateOtp,
  passwordHashing,
  saveOtp,
  verifyOtp,
} from "../lib/utils.js";
import { Role, sequelize, UserRole } from "../models/RootModel.js";
import { env } from "../config/env.js";
import { User } from "../models/RootModel.js";
import nodemailer from "nodemailer";
import { generateTokens } from "./commonService.js";

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
    const user = await User.create({ email: identifier, name, password });
    const userPayload = {
      id: user.id,
      email: user.email,
    };
    return generateTokens(userPayload);
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
    const user = await User.create({
      name,
      password,
      phone_number: identifier,
    });
    const userPayload = {
      id: user.id,
      phoneNumber: user.phone_number,
    };
    return generateTokens(userPayload);
  }
  return null;
};

const assignRoleToUser = async (token, roles) => {
  const transaction = await sequelize.transaction();
  try {
    const extractedPayload = jwt.verify(token, env.JWT_SECRET);
    extractedPayload.roles = roles.map((roleId) =>
      roleId === 1 ? "admin" : "employee"
    );

    const validRoles = await Role.findAll({
      where: {
        id: roles,
      },
      transaction,
    });

    if (validRoles.length !== roles.length)
      throw new Error("Some roles are invalid");

    const validUser = await Role.findOne({
      where: {
        id: extractedPayload.id,
      },
      transaction,
    });

    if (!validUser) throw new Error("User is invalid");

    await UserRole.destroy({ where: { user_id: validUser.id }, transaction });
    const userRoles = await UserRole.bulkCreate(
      roles.map((roleId) => ({
        user_id: validUser.id,
        role_id: roleId,
      })),
      { transaction }
    );

    await transaction.commit();

    if (userRoles && userRoles.length) return generateTokens(extractedPayload);
    return null;
  } catch (err) {
    await transaction.rollback();
    throw new Error(err.message);
  }
};

export {
  sendEmailVarification,
  verifyEmailToProceed,
  sendSmsProvider,
  verifySmsProvider,
  assignRoleToUser,
};
