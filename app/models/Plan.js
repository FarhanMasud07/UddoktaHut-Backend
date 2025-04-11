import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Plan = sequelize.define(
  "Plan",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    billing_cycle: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "plans",
    timestamps: false,
  }
);

export default Plan;
