const Movie = require("../models/movieModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/AuthMiddleware");

//Add Movie

router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Movie.create(req.body);
    res
      .status(200)
      .json({ message: "Movie added Successfully!! 🥳", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// GET ALL Movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
      .populate("actor")
      .populate("actress")
      .populate("director")
      .populate("cast")
      .populate("createdBy");
    res.status(200).json({
      data: movies,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Get Movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("actor")
      .populate("actress")
      .populate("director")
      .populate("cast")
      .populate("createdBy");
    res.status(200).json({
      data: movie,
      message: "Movie fetched Successfully!! 🥳",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Update Movie by ID
// router.put("/:id", async (req, res) => {
//   try {
//     await Movie.findByIdAndUpdate(req.params.id, req.body);
//     res.status(200).json({
//       message: "Movie Updated Successfully!! 🥳",
//       success: true
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// });
// Update Movie by ID
router.put("/:id", async (req, res) => {
  try {
    const existingMovie = await Movie.findById(req.params.id);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found", success: false });
    }

    // Merge existing movie with updated data from request body
    const updatedMovieData = { ...existingMovie.toObject(), ...req.body };

    // Update the movie
    await Movie.findByIdAndUpdate(req.params.id, updatedMovieData);

    res.status(200).json({
      message: "Movie Updated Successfully!! 🥳",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});


// Delete Movie By ID
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Movie Deleted Successfully!! 🥳",
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
