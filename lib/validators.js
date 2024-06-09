import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  let errorMessages = errors.array().map((error) => error.msg);

  if (errorMessages.includes("Please Enter Password")) {
    errorMessages.splice(
      errorMessages.indexOf("Password must be at least 8 characters"),
      1
    );
  }

  errorMessages = errorMessages.join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

export { registerValidator, validateHandler, loginValidator };
