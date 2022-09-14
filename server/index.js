"use strict";

const express = require("express");
const morgan = require("morgan");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addNews,
  getAllNews,
  getNewsById,
  getCategories,
  getImage,
  getLastNews,
  newsByCategory,
  updateView,
  getNewsByViews,
  getAllUsers,
  addNewUser,
  getUserById,
  getRandomNews,
  addComment,
  getComments,
  getCommentsByPostId,
  searchedNews,
  getRandomNewsByCategory,
} = require("./handler");

const PORT = 8000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  /// REST endpoints
  .get("/api/getAllNews", getAllNews)
  .get("/api/getNews/:id", getNewsById)
  .post("/api/dashboard/addNews", upload.single("file"), addNews)
  .get("/api/getCategories", getCategories)
  .get("/image/:key", getImage)
  .get("/api/getLastNews", getLastNews)
  .get("/api/category/:categoryName", newsByCategory)
  .patch("/api/:id", updateView)
  .get("/api/getNewsByViews", getNewsByViews)
  .get("/api/users", getAllUsers)
  .get("/api/user/:id", getUserById)
  .post("/api/addNewUser", addNewUser)
  .get("/api/getRandomNews", getRandomNews)
  .post("/api/addComment", addComment)
  .get("/api/getComments", getComments)
  .get("/api/getCommentsByPostId/:id", getCommentsByPostId)
  .get("/api/searchedNews/:searchContent", searchedNews)
  .get("/api/getRandomNewsByCategory/:category", getRandomNewsByCategory)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
