const mongoose = require("mongoose");
const ThreadModel = require("./thread.model");

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

categorySchema.pre("findOneAndDelete", async function (next) {
  try {
    const categoryId = this.getQuery()._id;
    await ThreadModel.deleteMany({ category_id: categoryId });
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
