import express from "express";
import cors from "cors";
import { env } from "./app/config/env.js";
import { rootRoute } from "./app/routes/rootRoute.js";
import { errorHandler } from "./app/middleware/errorHandler.js";
import { syncSequlizeBasedOnEnvironment } from "./app/models/RootModel.js";

const app = express();
const port = env.PORT || 4000;

app.use(express.json());
app.use(cors());

rootRoute(app);

app.use(errorHandler);

(async () => {
  try {
    await syncSequlizeBasedOnEnvironment();
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();
