require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./app/routes/users");
const categoryRouter = require("./app/routes/categories");
const threadRouter = require("./app/routes/threads");
const commentRouter = require("./app/routes/comments");

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", () => console.error("MongoDB connection error"));
db.once("open", () => {
  console.log("Connected to the mongoDB database");
});

app.use(express.json());
//app.use(express.urlencoded())
app.use(express.static("./public/"));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/threads", threadRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT, () =>
  console.log(`Listening at http://localhost:${process.env.PORT}`)
);
