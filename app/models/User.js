import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import pkg from "google-libphonenumber";

const { PhoneNumberUtil } = pkg;

const phoneUtil = PhoneNumberUtil.getInstance();

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isPhoneNumber(value) {
          if (!value) return;
          try {
            const phone = phoneUtil.parse(value);
            if (!phoneUtil.isValidNumber(phone))
              throw new Error("Invalid phone number format.");
          } catch (err) {
            throw new Error("Invalid phone number.");
          }
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
