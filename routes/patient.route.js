const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const {
  validatePatient,
  validationErrors,
} = require("../helpers/validation.helper.js");

router.post(
  "/createPatient",
  validatePatient,
  validationErrors,
  patientController.createPatient
);

module.exports = {
  patientRouter: router,
};
