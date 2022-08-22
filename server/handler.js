const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("./s3");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("news").find().toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `All news are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any news!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const addNews = async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();

    const newsData = {
      title: req.body.title,
      description: req.body.description,
      image: result.key,
      category: req.body.category,
    };
    const db = client.db("final-project");
    await db.collection("news").insertOne(newsData);
    client.close();

    res.status(200).json({
      status: 200,
      message: `News successfully added!`,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.id;

  console.log();

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .findOne({ _id: ObjectId(newsId) });
    client.close();

    // const key = result.image;
    // const readStream = getFileStream(key);
    // await readStream.pipe(res);

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `News found`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any news!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { getAllNews, addNews, getNewsById };
