import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
  "Role",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

export default Role;
