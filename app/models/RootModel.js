import { sequelize } from "../config/database.js";
import { env } from "../config/env.js";
import Role from "./Role.js";
import User from "./User.js";
import UserRole from "./UserRole.js";

// USER_ROLE (MANY TO MANY)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  onDelete: "CASCADE",
});

const syncSequlizeBasedOnEnvironment = async () => {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully.");
  switch (env.NODE_ENV) {
    case "development":
      //await sequelize.sync({ force: true });
      break;
    case "staging":
      await sequelize.sync({ alter: true }); // ⚠️ Keeps data but may be slow
      break;
    case "production":
      //await sequelize.sync({ force: true });
      console.log("✅ Running in production mode, use migrations!");
      break;
    default:
      console.log("✅ Running in default mode!");
  }
  console.log("✅ Database synced successfully.");
};

export { syncSequlizeBasedOnEnvironment, sequelize, User, Role, UserRole };
