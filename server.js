require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./app/routes/users.route");
const categoryRouter = require("./app/routes/categories.route");
const threadRouter = require("./app/routes/threads.route");
const commentRouter = require("./app/routes/comments.route");
const authRouter = require("./app/routes/auth.route");

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
app.use(express.static("./public/"));

app.use("/auth", authRouter);
app.use("/users", authenticateToken, userRouter);
app.use("/categories", authenticateToken, categoryRouter);
app.use("/threads", authenticateToken, threadRouter);
app.use("/comments", authenticateToken, commentRouter);

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Token from bearer header
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Authorization token not found" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    req.user = user;
    next();
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Listening at http://localhost:${process.env.PORT}`)
);
