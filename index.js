const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://hirariaz:hir%408113261@cluster0.o50mijm.mongodb.net/doc24-7`,
    {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected");
  });

app.use(express.json());
app.set("view engine", "ejs");
// const { userRouter } = require("./routes/userfs.route.js");
const { userRouter } = require("./routes/user.route.js");
const { patientRouter } = require("./routes/patient.route.js");
app.use("/", userRouter);
app.use("/", patientRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
