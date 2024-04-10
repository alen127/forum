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
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  HOSTNAME,
  PORT,
} = require("./config/config.js");

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/forum?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", () => console.error("MongoDB connection error"));
db.once("open", () => {
  console.log("Successfully connected to database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "app", "public", "browser")));

app.use("/auth", authRouter);
app.use("/users", authenticateToken, userRouter);
app.use("/categories", authenticateToken, categoryRouter);
app.use("/threads", authenticateToken, threadRouter);
app.use("/comments", authenticateToken, commentRouter);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "app", "public", "browser", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

app.listen(PORT, HOSTNAME, (err) => {
  if (err) console.log(`Error starting express server`, err);
  console.log(`Server is listening on ${HOSTNAME}:${PORT}`);
});
