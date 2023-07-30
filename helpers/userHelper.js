const fs = require("fs");
const { check, validationResult } = require("express-validator");

const readUserData = (callback) => {
  fs.readFile("./User/userData.json", "utf-8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return callback(err);
    }

    let users = [];
    if (data) {
      try {
        users = JSON.parse(data);
      } catch (error) {
        return callback(error);
      }
    }

    callback(null, users);
  });
};

const writeUserData = (users, callback) => {
  fs.writeFile(
    "./User/userData.json",
    JSON.stringify(users, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        return callback(err);
      }

      callback(null);
    }
  );
};
const isNotNumeric = (value) => {
  return isNaN(value);
};
const validateUser = [
  check("id").notEmpty().withMessage("ID is required."),
  check("email")
    .isEmail()
    .withMessage("Invalid email format.")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Email must be less than 256 characters.")
    .custom(async (email) => {
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .custom(isNotNumeric)
    .withMessage("Name must not be numeric.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isInt()
    .withMessage("Age must be an integer."),
  check("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .isInt()
    .withMessage("Weight must be an integer."),
  check("height")
    .notEmpty()
    .withMessage("Height is required.")
    .isFloat()
    .withMessage("Height must be a floating-point number."),
  check("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["male", "female"])
    .withMessage('Gender must be either "male" or "female".'),
  check("isMarried")
    .notEmpty()
    .withMessage("Status is required.")
    .isBoolean()
    .withMessage("Status must be a boolean (true/false)."),
];
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => ({ field: error.param, message: error.msg }));
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  readUserData,
  writeUserData,
  validateUser,
  validationErrors,
};
