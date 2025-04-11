import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { env } from "../config/env.js";

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store_url: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    store_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "stores",
    timestamps: false,

    hooks: {
      afterCreate: async (store, options) => {
        const slug = store.id.toString();
        if (!store.store_url) {
          store.store_url = env.isProd
            ? `https://uddoktahut.com/store/${slug}`
            : `http://localhost:3000/store/${slug}`;
        }
        await store.save({ transaction: options.transaction });
      },
    },
  }
);

export default Store;
