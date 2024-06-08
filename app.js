import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 4000;
const mode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDB(mongoURI);

const app = express();

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${mode} mode`);
});
