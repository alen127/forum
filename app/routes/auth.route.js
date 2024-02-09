require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/jwt");

router.post("/register", async (req, res) => {
  //Check to see if username already exists
  try {
    const { username, email, password, created_at } = req.body;

    if (await UserModel.findOne({ username: username }))
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      created_at,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to register", error: err });
  }
});
router.post("/login", async (req, res) => {
  //Authenticate user
  let user;
  try {
    user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "Wrong username" });
  } catch (err) {
    res.status(500).json({ message: "Couldnt find user", error: err });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userPayload = {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      };

      //Authorize user
      jwt.sign(
        userPayload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            res.status(500).json({
              message: "Error generating token",
              error: err,
            });
          } else {
            res.json({ user: userPayload, accessToken: token });
          }
        }
      );
    } else res.status(400).json({ message: "Wrong password" });
  } catch (err) {
    res.status(500).json({ message: "Failed user authorization", error: err });
  }
});

router.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
