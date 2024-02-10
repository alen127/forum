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

threadSchema.pre("findOneAndDelete", async function (next) {
  try {
    const threadId = this.getQuery()._id;
    await CommentModel.deleteMany({
      thread_id: threadId,
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

threadSchema.pre("deleteMany", async function (next) {
  try {
    const query = this.getQuery();
    const threads = await ThreadModel.find(query);
    const threadIds = threads.map((thread) => thread._id);

    const f = await CommentModel.deleteMany({
      thread_id: { $in: threadIds },
    });

    console.log("deleted comments", threadIds, f);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const ThreadModel = mongoose.model("Thread", threadSchema);

module.exports = ThreadModel;
