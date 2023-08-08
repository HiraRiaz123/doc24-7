const fs = require("fs");
const { check, validationResult } = require("express-validator");

const isNotNumeric = (value) => {
  return isNaN(value);
};

const validateUser = [
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
  check("firstName")
    .notEmpty()
    .withMessage("First-Name is required.")
    .custom(isNotNumeric)
    .withMessage("First-Name must not be numeric.")
    .isLength({ min: 3 })
    .withMessage("First-Name must be at least 3 characters long."),
  check("lastName")
    .notEmpty()
    .withMessage("Last-Name is required.")
    .custom(isNotNumeric)
    .withMessage("Last-Name must not be numeric.")
    .isLength({ min: 3 })
    .withMessage("Last-Name must be at least 3 characters long."),
  check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isString()
    .withMessage("Age must be a string."),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Mobile Number is required.")
    .isInt()
    .withMessage("Mobile Number must be an integer."),
  check("address").notEmpty().withMessage("Address is required."),
  check("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["MALE", "FEMALE"])
    .withMessage('Gender must be either "Male" or "Female".'),
  check("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage('Status must be either "Active" or "In-active".'),
  check("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(["DOCTOR", "CLINICAL STAFF"])
    .withMessage('Role must be either "Doctor" or "Clinical-staff".'),
  check("shift")
    .notEmpty()
    .withMessage("Shift is required.")
    .isIn(["MORNING", "EVENING"])
    .withMessage('Shift must be either "Morning" or "Evening".'),
  check("department")
    .notEmpty()
    .withMessage("Department is required.")
    .isIn(["PSYCHOLOGY", "REGULAR", "HEART"])
    .withMessage(
      'Department must be either "Psychology", "Regular" or "Heart".'
    ),
];
const validatePatient = [
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
  check("firstName")
    .notEmpty()
    .withMessage("First-Name is required.")
    .custom(isNotNumeric)
    .withMessage("First-Name must not be numeric.")
    .isLength({ min: 3 })
    .withMessage("First-Name must be at least 3 characters long."),
  check("lastName")
    .notEmpty()
    .withMessage("Last-Name is required.")
    .custom(isNotNumeric)
    .withMessage("Last-Name must not be numeric.")
    .isLength({ min: 3 })
    .withMessage("Last-Name must be at least 3 characters long."),
  check("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isString()
    .withMessage("Age must be a string."),
  check("weight")
    .notEmpty()
    .withMessage("Weight is required.")
    .isString()
    .withMessage("Weight must be a string."),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Mobile Number is required.")
    .isInt()
    .withMessage("Mobile Number must be an integer."),
  check("address").notEmpty().withMessage("Address is required."),
  check("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["MALE", "FEMALE"])
    .withMessage('Gender must be either "Male" or "Female".'),
  check("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage('Status must be either "Active" or "In-active".'),
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
  validateUser,
  validatePatient,
  validationErrors,
};
