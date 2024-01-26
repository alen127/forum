const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thread_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
