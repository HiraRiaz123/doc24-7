const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

router.post("/createPatient", patientController.createPatient);

module.exports = {
  patientRouter: router,
};
