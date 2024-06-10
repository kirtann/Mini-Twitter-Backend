import express from "express";
import {
  createTweet,
  getFriendsTweets,
  getMyTweets,
} from "../controllers/tweetController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/create", createTweet);

app.get("/mytweets", getMyTweets);

app.get("/friendtweets", getFriendsTweets);

export default app;
