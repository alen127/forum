const express = require("express");
const CategoryModel = require("../models/category.model");
const ThreadModel = require("../models/thread.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Couldnt get categories", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Couldnt find category", error: err });
  }
});

router.get("/:id/threads", async (req, res) => {
  try {
    const threads = await ThreadModel.find({ category_id: req.params.id });
    if (!threads) return res.status(404).json({ message: "Threads not found" });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: "Couldnt find threads", error: err });
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
    res.status(400).json({ message: "Couldnt create category", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Couldnt delete category", error: err });
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
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: "Couldnt update category", error: err });
  }
});

module.exports = router;
