import dotenv from "dotenv";
dotenv.config();
export const env = {
  PORT: process.env.PORT,
  ZOHO_APP_PASSWORD: process.env.ZOHO_APP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  UDDOKTAHUT_EMAIL: process.env.UDDOKTAHUT_EMAIL,
  SMTP_PORT: process.env.SMTP_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  SMS_API_KEY: process.env.SMS_API_KEY,
  SMS_SENDER_ID: process.env.SMS_SENDER_ID,
  SMS_TYPE: process.env.SMS_TYPE,
  SMS_URL: process.env.SMS_URL,
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
