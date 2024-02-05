const express = require("express");
const ThreadModel = require("../models/thread.model");
const CommentModel = require("../models/comment.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const threads = await ThreadModel.find({});
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: "Couldnt get thread", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thread = await ThreadModel.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ message: "Couldnt get thread", error: err });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await CommentModel.find({ thread_id: req.params.id });
    if (!comments)
      return res.status(404).json({ message: "Comments not found" });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Couldnt find comments", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, category_id, user_id, created_at } = req.body;
    const newThread = await ThreadModel.create({
      title,
      content,
      category_id,
      user_id,
      created_at,
    });
    res.status(201).json(newThread);
  } catch (err) {
    res.status(400).json({ message: "Couldnt add thread", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thread = await ThreadModel.findByIdAndDelete(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found" });
    res.json({ message: "Thread successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Couldnt delete thread", error: err });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedFields = {};
  if (req.body.title) {
    updatedFields["title"] = req.body.title;
  }
  if (req.body.content) {
    updatedFields["content"] = req.body.content;
  }
  if (req.body.category_id) {
    updatedFields["category_id"] = req.body.category_id;
  }
  if (req.body.user_id) {
    updatedFields["user_id"] = req.body.user_id;
  }
  if (req.body.created_at) {
    updatedFields["created_at"] = req.body.created_at;
  }
  if (Object.keys(updatedFields).length === 0)
    return res.status(400).json({ message: "Thread not updated, bad payload" });
  try {
    const updatedThread = await ThreadModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!updatedThread)
      return res.status(404).json({ message: "Thread not found" });
    res.json(updatedThread);
  } catch (err) {
    res.status(500).json({ message: "Couldnt update thread", error: err });
  }
});

module.exports = router;
