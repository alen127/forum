const express = require("express");
const CommentModel = require("../models/comment.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Couldnt get comments", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Couldnt get comment", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, user_id, thread_id, created_at } = req.body;
    const newComment = await CommentModel.create({
      content,
      user_id,
      thread_id,
      created_at,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Couldnt add comment", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Couldnt delete comment", error: err });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedFields = {};
  if (req.body.content) {
    updatedFields["content"] = req.body.content;
  }
  if (req.body.thread_id) {
    updatedFields["thread_id"] = req.body.thread_id;
  }
  if (req.body.user_id) {
    updatedFields["user_id"] = req.body.user_id;
  }
  if (req.body.created_at) {
    updatedFields["created_at"] = req.body.created_at;
  }
  if (Object.keys(updatedFields).length === 0)
    return res
      .status(400)
      .json({ message: "Comment not updated, bad payload" });
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: "Couldnt update comment", error: err });
  }
});

module.exports = router;
