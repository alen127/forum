const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
