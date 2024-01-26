const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const ThreadModel = mongoose.model("Thread", threadSchema);

module.exports = ThreadModel;
