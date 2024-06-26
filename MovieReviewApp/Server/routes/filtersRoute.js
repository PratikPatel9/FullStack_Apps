const router = require("express").Router();
const Movie = require("../models/movieModel");
const Artist = require("../models/artistModel");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search || "";
    const [movies, artists] = await Promise.all([
      Movie.find({
        name: { $regex: search, $options: "i" }
      }),
      Artist.find({
        name: { $regex: search, $options: "i" }
      })
    ]);
    res.status(200).json({
      data: { movies: movies || [], artists: artists || [] }
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;
