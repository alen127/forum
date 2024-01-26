const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User successfully deleted" });
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
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
