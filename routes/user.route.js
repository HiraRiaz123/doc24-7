const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  validateUser,
  validationErrors,
} = require("../helpers/validation.helper.js");

router.post(
  "/createUser",
  validateUser,
  validationErrors,
  userController.createUser
);

module.exports = {
  userRouter: router,
};
