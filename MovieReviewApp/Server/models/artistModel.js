const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      required: true
    },
    debuteYear: {
      type: Number,
      required: true
    },
    debuteMovie: {
      type: String,
      required: true
    },
    proffession: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("artists", ArtistSchema);
