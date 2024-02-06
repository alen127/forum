const mongoose = require("mongoose");
const CommentModel = require("./comment.model");

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

// threadSchema.pre("findOneAndDelete", async function (next) {
//   try {
//     console.log("Deleting comments for thread");
//     await CommentModel.deleteMany({
//       thread_id: this._id,
//     });
//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

const ThreadModel = mongoose.model("Thread", threadSchema);

module.exports = ThreadModel;
