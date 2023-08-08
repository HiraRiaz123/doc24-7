const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, //remove whitespaces before and after
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
    },
    systemRoles: [
      {
        role: {
          type: String,
          required: true,
          enum: ["DOCTOR", "CLINICAL STAFF"],
        },
        shift: {
          type: String,
          required: true,
          enum: ["MORNING", "EVENING"],
        },
        department: {
          type: String,
          required: true,
          enum: ["PSYCHOLOGY", "REGULAR", "HEART"],
        },
      },
    ],
  },
  {
    timestamps: true,
    _id: true,
  }
);

module.exports = mongoose.model("user", userSchema);
