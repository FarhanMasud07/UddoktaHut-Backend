import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const UserRole = sequelize.define(
  "user_roles",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Referencing `users` table
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // Referencing `roles` table
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "user_roles",
  }
);

export default UserRole;
