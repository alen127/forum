const mongoose = require("mongoose");
const UserModel = require("./app/models/user.model");
const CategoryModel = require("./app/models/category.model");
const ThreadModel = require("./app/models/thread.model");
const CommentModel = require("./app/models/comment.model");
require("dotenv").config();
const users = [
  {
    _id: "65b42354021f3a7bf36dc323",
    username: "root",
    password: "$2b$10$.4UR1sbAA8PI2eCPq8ahxOWXPWpK0ZtbVmW5V3pPp1Xmt1FbyY6Py",
    email: "root@tvz.hr",
    created_at: "2024-01-26T21:25:40.123Z",
    role: "admin",
  },
  {
    _id: "65c2106088912121c3c9a29a",
    username: "regular",
    password: "$2b$10$cqe31s8a4KKFR1GXfIpX4u7UrLOwJsceN2GZ.mA.OJ.01usYSwAHS",
    email: "reg@gmail.com",
    created_at: "2024-02-06T10:56:32.368Z",
    role: "regular",
  },
];
const categories = [
  {
    _id: "65c250cd8a851270ba44c638",
    name: "General Discussion",
    description: "A place for general chit-chat about everything and anything.",
    created_at: "2024-02-06T00:00:00Z",
    user_id: "65b42354021f3a7bf36dc323",
  },
  {
    _id: "65c250cd8a851270ba44c639",
    name: "Feedback",
    description: "Share your feedback and suggestions for improvements.",
    created_at: "2024-02-06T00:00:00Z",
    user_id: "65b42354021f3a7bf36dc323",
  },
];

const threads = [
  {
    _id: "65c251118a851270ba44c63f",
    title: "Welcome Everyone!",
    content: "Let's introduce ourselves and get to know each other.",
    category_id: "65c250cd8a851270ba44c638",
    user_id: "65c2106088912121c3c9a29a",
    created_at: "2024-02-06T00:00:00Z",
  },
  {
    _id: "65c251118a851270ba44c640",
    title: "Site Feedback",
    content: "Please share your thoughts on how we can improve.",
    category_id: "65c250cd8a851270ba44c639",
    user_id: "65b42354021f3a7bf36dc323",
    created_at: "2024-02-06T00:00:00Z",
  },
];

const comments = [
  {
    _id: "65c251668a851270ba44c64c",
    content: "Really loving the discussions here!",
    user_id: "65c2106088912121c3c9a29a",
    thread_id: "65c251118a851270ba44c640",
    created_at: "2024-02-06T00:00:00Z",
  },
  {
    _id: "65c251668a851270ba44c64d",
    content: "Can we also talk about XYZ topic?",
    user_id: "65b42354021f3a7bf36dc323",
    thread_id: "65c251118a851270ba44c63f",
    created_at: "2024-02-06T00:00:00Z",
  },
];

mongoose.connect(process.env.DB_CONNECTION_STRING);

// Insert data into the database
async function insertMockData() {
  try {
    await UserModel.insertMany(users);
    console.log("Users inserted successfully.");

    await CategoryModel.insertMany(categories);
    console.log("Categories inserted successfully.");

    await ThreadModel.insertMany(threads);
    console.log("Threads inserted successfully.");

    await CommentModel.insertMany(comments);
    console.log("Comments inserted successfully.");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
}

// Run the function to insert data
insertMockData().then(() => mongoose.disconnect());
