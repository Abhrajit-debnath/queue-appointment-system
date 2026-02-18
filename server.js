import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDb from "./src/db/db.js";
import cookieParser from "cookie-parser";
import { initializeClient } from "./src/cache/redis/config.redis.js";

const PORT = process.env.PORT || 3000;

app.use(cookieParser(process.env.COOKIE_SECRET));

const startServer = async () => {
  try {
    await connectToDb();
    await initializeClient();

    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();
