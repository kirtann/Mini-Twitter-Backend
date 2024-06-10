import express from "express";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators.js";
import { getMyProfile, login, newUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

app.use(isAuthenticated);

app.get("/me", getMyProfile);

export default app;
