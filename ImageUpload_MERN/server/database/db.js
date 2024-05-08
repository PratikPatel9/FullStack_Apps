const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const path = require("path");

// Connect to MongoDB
const connectDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Initialize GridFS
let gfs;
const initGridFS = (connection) => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads"); // Set the name of the collection (e.g., 'uploads')
};

// Function to upload file to GridFS
const uploadFileToGridFS = (filepath) => {
  const filename = path.basename(filepath);
  const writestream = gfs.createWriteStream({ filename });
  fs.createReadStream(filepath).pipe(writestream);
};

// Function to fetch file from GridFS
const fetchFileFromGridFS = (filename, res) => {
  gfs.exist({ filename }, (err, found) => {
    if (err) {
      console.error("Error checking file existence:", err);
      return res.status(500).send("Error checking file existence");
    }
    if (!found) {
      return res.status(404).send("File not found");
    }
    const readstream = gfs.createReadStream({ filename });
    readstream.pipe(res);
  });
};

module.exports = {
  connectDB,
  initGridFS,
  uploadFileToGridFS,
  fetchFileFromGridFS
};
