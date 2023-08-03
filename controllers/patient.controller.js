const PatientModel = require("../models/patient.model");

exports.createPatient = async (req, res, next) => {
  const savedPatient = await PatientModel.savePatient(req.body);
  res.status(201).json({
    message: "SUCCESS",
    patient: savedPatient,
  });
};
