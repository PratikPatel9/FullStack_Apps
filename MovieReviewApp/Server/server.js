const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/db");
app.use(express.json());

// importing Routes
const userRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistsRoute");
const imagesRoute = require("./routes/imagesRoute");
const moviesRoute = require("./routes/moviesRoute");

// exporting routes
app.use("/api/users", userRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/movies", moviesRoute);

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Node JS Server is listening on PORT : ${PORT}`);
});
