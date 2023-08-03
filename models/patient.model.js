const Patient = require("../schemas/patient.schema");

const savePatient = async (patientData) => {
  const patient = new Patient(patientData);
  const savedPatient = await patient.save();
  return savedPatient;
};

module.exports = {
  savePatient,
};
