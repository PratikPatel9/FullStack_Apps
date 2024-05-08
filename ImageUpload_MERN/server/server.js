const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const UserModel = require("./models/Users");
const Grid = require("gridfs-stream");
const fs = require("fs");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// database connection
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => console.log("Connection Successfull!!"))
  .catch((error) => console.log("Error in MongoDB connection", error));

// File storage middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({
  storage: storage
});

// route
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  UserModel.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((error) => console.log(error));
});

// get back uploaded Image from MongoDB database
app.get("/getImage", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.listen(PORT, () => {
  console.log(`App is Running on PORT : ${PORT}`);
});



