const express = require("express");
require("dotenv").config();
const db = require("./database/db");
const app = express();

app.use(express.json());
const userRoute = require("./routes/usersRoute");

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Node JS Server is listening on PORT : ${PORT}`);
});