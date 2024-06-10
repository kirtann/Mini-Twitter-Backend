import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { corsOptions } from "./config/config.js";
import connectDB from "./config/database.js";
import { errorMiddleware } from "./middlewares/error.js";

import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${mode} mode`);
});
