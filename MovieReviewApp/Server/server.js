const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/db");
app.use(express.json());


const userRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistRoute");
const imagesRoute = require('./routes/imagesRoute.js');

app.use("/api/users", userRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/images", imagesRoute);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Node JS Server is listening on PORT : ${PORT}`);
});
