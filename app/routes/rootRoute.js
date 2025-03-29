import { storeAiRoutes } from "./storeAiRoutes.js";
import { userRoutes } from "./userRoutes.js";

const rootRoute = (app) => {
  app.use("/user", userRoutes);
  app.use("/store-ai", storeAiRoutes);
};

export { rootRoute };
