import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Subscription = sequelize.define(
  "Subscription",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "stores", key: "id" },
    },
    status: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    trial_ends_at: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    is_auto_renew: { type: DataTypes.BOOLEAN, defaultValue: false },
    plan_id: {
      type: DataTypes.INTEGER,
      references: { model: "plans", key: "id" },
      allowNull: true,
    },
  },
  {
    tableName: "subscriptions",
    timestamps: false,
  }
);

export default Subscription;
