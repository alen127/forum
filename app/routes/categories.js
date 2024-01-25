const express = require("express");
const CategoryModel = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, user_id, created_at } = req.body;
    const newCategory = await CategoryModel.create({
      name,
      description,
      user_id,
      created_at,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedFields = {};
  if (req.body.name) {
    updatedFields["name"] = req.body.name;
  }
  if (req.body.description) {
    updatedFields["description"] = req.body.description;
  }
  if (req.body.created_at) {
    updatedFields["created_at"] = req.body.created_at;
  }
  if (req.body.user_id) {
    updatedFields["user_id"] = req.body.user_id;
  }

  if (Object.keys(updatedFields).length === 0)
    return res
      .status(400)
      .json({ message: "Category not updated, bad payload" });

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
