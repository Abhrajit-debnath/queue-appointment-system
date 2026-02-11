import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectToDb from "./src/db/db.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

app.use(cookieParser(process.env.COOKIE_SECRET));

connectToDb();

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
