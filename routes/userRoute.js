import express from "express";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators.js";
import { login, newUser } from "../controllers/userController.js";

const app = express.Router();

app.post("/new", registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

export default app;
