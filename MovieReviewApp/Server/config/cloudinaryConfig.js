const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_Name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret // Click 'View Credentials' below to copy your API secret
});

module.exports = cloudinary;
