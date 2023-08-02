const {
  readUserData,
  writeUserData,
  validateUser,
  validationErrors,
} = require("../helpers/userfs.helpers.js");
const fs = require("fs");

fs.mkdir("user", (err) => {
  // if (err) throw err;
  console.log("User folder created successfully");
});

exports.userIndex = (req, res) => {
  readUserData((err, users) => {
    if (err) {
      console.error("Error reading user data:", err.message);
      return res.status(500).json({ error: "Error reading user data." });
    }
    res.render("user/userIndex", { users });
  });
};
exports.viewUser = (req, res) => {
  readUserData((err, users) => {
    if (err) {
      console.error("Error reading user data:", err.message);
      return res.status(500).json({ error: "Error reading user data." });
    }
    res.status(200).json(users);
  });
};

exports.createUser = (req, res) => {
  readUserData((err, users) => {
    if (err) {
      console.error("Error reading user data:", err.message);
      return res.status(500).json({ error: "Error reading user data." });
    }
    const newUser = req.body;
    const isUserExist = users.find((user) => user.id === newUser.id);
    if (isUserExist) {
      return res
        .status(409)
        .json({ error: "User with the same ID already exists." });
    }
    users.push(newUser);
    writeUserData(users, (err) => {
      if (err) {
        console.error("Error writing user data:", err.message);
        return res.status(500).json({ error: "Error writing user data." });
      }
      res.status(201).json({ message: "User created successfully." });
    });
  });
};

exports.updateUser = (req, res) => {
  const userId = JSON.parse(req.params.id);
  const newData = req.body;
  readUserData((err, users) => {
    if (err) {
      console.error("Error reading user data:", err.message);
      return res.status(500).json({ error: "Error reading user data." });
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found." });
    }
    Object.assign(users[userIndex], newData);
    writeUserData(users, (err) => {
      if (err) {
        console.error("Error writing user data:", err.message);
        return res.status(500).json({ error: "Error writing user data." });
      }
      res.status(200).json({ message: "User data updated successfully." });
    });
  });
};
