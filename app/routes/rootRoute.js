import { authRoutes } from "./authRoutes.js";
import { storeRoutes } from "./storeRoutes.js";
import { subscriptionRoutes } from "./subscriptionRoutes.js";
import { userRoutes } from "./userRoutes.js";

const rootRoute = (app) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/store", storeRoutes);
  app.use("/subscription", subscriptionRoutes);
};

export { rootRoute };
