"use strict";

const express = require("express");
const morgan = require("morgan");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { addNews, getAllNews, getNewsById } = require("./handler");

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

  .get("/getAllNews", getAllNews)
  .get("/getNews/:id", getNewsById)
  .post("/addNews", upload.single("image"), addNews)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
