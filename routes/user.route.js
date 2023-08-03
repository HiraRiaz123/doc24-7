const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
router.post("/createUser", userController.createUser);

module.exports = {
  userRouter: router,
};