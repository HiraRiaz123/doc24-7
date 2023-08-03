const UserModel = require("../models/user.model");

exports.createUser = async (req, res, next) => {
  const savedUser = await UserModel.saveUser(req.body);
  res.status(201).json({
    message: "SUCCESS",
    user: savedUser,
  });
};
