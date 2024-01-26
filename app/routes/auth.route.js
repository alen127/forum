require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, created_at } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      created_at,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  //Authenticate user
  let user;
  try {
    user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "User not found" });
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

      jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error generating token", error: err });
        } else {
          res.json({ accessToken: token });
        }
      });
    } else res.status(400).json({ message: "Not Allowed" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
