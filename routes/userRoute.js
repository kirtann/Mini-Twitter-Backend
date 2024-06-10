import express from "express";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators.js";
import {
  addFollowing,
  getMyProfile,
  getUserDetail,
  login,
  logout,
  newUser,
  searchUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.get("/logout", logout);

app.get("/search", searchUser);

app.post("/addfollowing", addFollowing);

app.post("/getuserdetail", getUserDetail);

export default app;
