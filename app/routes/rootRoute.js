import { emailProviderRoute } from "./emailProviderRoutes.js";
import { smsProviderRoutes } from "./smsProviderRoutes.js";
import { storeAiRoutes } from "./storeAiRoutes.js";

const rootRoute = (app) => {
  app.use("/mail", emailProviderRoute);
  app.use("/sms", smsProviderRoutes);
  app.use("/store-ai", storeAiRoutes);
};

export { rootRoute };
