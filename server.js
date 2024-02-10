require("dotenv").config();
const authenticateToken = require("./app/middleware/jwt.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./app/routes/users.route");
const categoryRouter = require("./app/routes/categories.route");
const threadRouter = require("./app/routes/threads.route");
const commentRouter = require("./app/routes/comments.route");
const authRouter = require("./app/routes/auth.route");
const path = require("path");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "app", "public")));

app.use("/auth", authRouter);
app.use("/users", authenticateToken, userRouter);
app.use("/categories", authenticateToken, categoryRouter);
app.use("/threads", authenticateToken, threadRouter);
app.use("/comments", authenticateToken, commentRouter);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "app", "public", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(process.env.PORT, () =>
  console.log(`Listening at http://localhost:${process.env.PORT}`)
);
