import { Sequelize } from "sequelize";
import { env } from "./env.js";

const isProduction = env.NODE_ENV === "production";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : { ssl: false },
});

export { sequelize };
