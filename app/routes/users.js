const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email, password, role, created_at } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      created_at,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedFields = {};
  if (req.body.username) {
    updatedFields["username"] = req.body.username;
  }
  if (req.body.email) {
    updatedFields["email"] = req.body.email;
  }
  if (req.body.role) {
    updatedFields["role"] = req.body.role;
  }
  if (req.body.password) {
    updatedFields["password"] = await bcrypt.hash(req.body.password, 10);
  }
  if (req.body.created_at) {
    updatedFields["created_at"] = req.body.created_at;
  }

  if (Object.keys(updatedFields).length === 0)
    return res.status(400).json({ message: "User not updated, bad payload" });

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
