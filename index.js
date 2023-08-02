const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
app.use(express.json());
app.set("view engine", "ejs");
const { userRouter } = require("./routes/userfs.routes.js");
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
