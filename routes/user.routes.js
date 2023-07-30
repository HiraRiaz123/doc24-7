const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.controller");
const { validateUser, validationErrors } = require("../helpers/userHelper.js");

router.get("/userIndex", userController.userIndex);
router.get("/viewUser", userController.viewUser);
router.post("/createUser",validateUser,validationErrors,userController.createUser);
router.put("/updateUser/:id",validateUser,validationErrors,userController.updateUser);

module.exports = {
  userRouter: router,
};
