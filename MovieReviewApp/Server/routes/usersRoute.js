const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res) => {
  try {
    // check If user  exists through emial
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) throw new Error("User with this Name is already exists");
    // Hash Password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // create new User
    await User.create(req.body);

    res
      .status(200)
      .json({ message: "User Registered Successfully!!", sucsess: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: flase });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  try {
    // checking that USer present in database
    const user = await User.findOne({ email: req.params.email });
    if (!user) throw new Error("User with this email does not EXIST");
    // check if password is correct or not
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Invalid Password");
    // create Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRETE, {
      expiresIn: "1d"
    });
    // handle Success response
    res
      .status(200)
      .json({ message: "Login SuccessFull", success: true, data: token });
  } catch (error) {
    res.status(500).json({ message: error.message, success: flase });
  }
});

module.exports = router;
