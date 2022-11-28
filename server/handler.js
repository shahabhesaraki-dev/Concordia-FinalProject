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
  const client = new MongoClient(MONGO_URI, options);
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

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const newsData = {
      title: req.body.title,
      description: req.body.description,
      image: result.key,
      category: req.body.category,
    };
    const db = client.db("final-project");
    const finalResult = await db.collection("news").insertOne(newsData);
    client.close();

    res.status(200).json({
      status: 200,
      reservedId: finalResult.insertedId.toString(),
      message: `News successfully added!`,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.id;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .findOne({ _id: ObjectId(newsId) });
    client.close();

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

const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find({})
      .project({ category: 1 })
      .toArray();
    client.close();

    const allCategoriesFromResult = result.map((item) => {
      return item.category;
    });

    const uniqueCategories = [...new Set(allCategoriesFromResult)];

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: uniqueCategories,
          message: `Categories loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any category!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getImage = async (req, res) => {
  try {
    const { key } = await req.params;
    const readStream = getFileStream(key);
    await readStream.pipe(res);
  } catch {
    return res.status(404);
  }
};

const getLastNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find()
      .sort({ _id: -1 })
      .limit(3)
      .toArray();
    client.close();

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

const newsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find({ category: categoryName })
      .toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `All ${categoryName} news are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any news!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const updateView = async (req, res) => {
  const newsId = req.params.id;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .findOne({ _id: ObjectId(newsId) });
    if (result) {
      if (result.view) {
        await db
          .collection("news")
          .updateOne(
            { _id: ObjectId(newsId) },
            { $set: { view: result.view + 1 } }
          );
      } else {
        await db
          .collection("news")
          .updateOne({ _id: ObjectId(newsId) }, { $set: { view: 1 } });
      }
    } else {
      console.log("Could not find the ID");
    }
    client.close();

    result
      ? res.status(200).json({
          status: 200,
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

const getNewsByViews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find()
      .sort({ view: -1 })
      .limit(3)
      .toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `News loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any News!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("users").find().toArray();
    client.close();

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "All users found",
        })
      : res.status(404).json({
          status: 404,
          message: "Couldn't find any User",
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("users").findOne({ _id: id });
    client.close();

    result
      ? res.status(200).json({
          status: 200,
          data: result,
          message: "User found",
        })
      : res.status(404).json({
          status: 404,
          message: "Couldn't find any User",
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const addNewUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });
    client.close();

    if (!user) {
      db.collection("users").insertOne(req.body);
      res.status(200).json({
        data: req.body,
        message: "User successfully added",
      });
    } else {
      res.status(200).json({
        data: user,
        message: "User is already in DB",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getRandomNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find()
      .sort({ _id: -1 })
      .limit(10)
      .toArray();

    client.close();

    const getThreeRandomItem = (array, num) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    };

    result
      ? res.status(200).json({
          status: 200,
          data: getThreeRandomItem(result, 4),
          message: "Random news have been found.",
        })
      : res.status(400).json({
          status: 404,
          message: "No news is available",
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const addComment = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comment = req.body.comment;
  const postId = req.body.postId;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    await db.collection("comments").insertOne({
      name: name,
      email: email,
      comment: comment,
      postId: postId,
    });
    client.close();

    res.status(200).json({
      status: 200,
      message: `Comment successfully added!`,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db.collection("comments").find().toArray();
    client.close();

    result.length > 0
      ? res.status(200).json({
          status: 200,
          data: result,
          message: `All Comments are loaded!`,
        })
      : res.status(404).json({
          status: 404,
          message: `Couldn't find any comment!`,
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getCommentsByPostId = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("comments")
      .find({ postId: id })
      .toArray();
    client.close();

    res.status(200).json({
      status: 200,
      data: result,
      message: `All Comments are loaded!`,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const searchedNews = async (req, res) => {
  const { searchContent } = req.params;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find({
        $or: [
          { description: { $regex: searchContent, $options: "i" } },
          { title: { $regex: searchContent, $options: "i" } },
        ],
      })
      .toArray();

    client.close();

    res.status(200).json({
      status: 200,
      data: result,
      message: `News found!`,
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getRandomNewsByCategory = async (req, res) => {
  const { category } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .find({ category: category })
      .sort({ _id: -1 })
      .limit(10)
      .toArray();

    client.close();

    const getThreeRandomItem = (array, num) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, num);
    };

    result
      ? res.status(200).json({
          status: 200,
          data: getThreeRandomItem(result, 4),
          message: "Random news by category have been found.",
        })
      : res.status(400).json({
          status: 404,
          message: "No news is available",
        });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const deleteNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { newsId } = req.params;

  try {
    await client.connect();
    const db = client.db("final-project");
    const result = await db
      .collection("news")
      .deleteOne({ _id: ObjectId(newsId) });
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ status: 200, message: "News successfully removed" });
    }
    client.close();
  } catch (err) {
    console.log("Error: ", err);
  }
};

const editNews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;

  const file = req.file;

  const resultKey = [];

  if (file) {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    resultKey.push(result.key);
  } else {
    resultKey.push(req.body.file);
  }

  const newsData = {
    title: req.body.title,
    description: req.body.description,
    image: resultKey[0],
    category: req.body.category,
  };

  try {
    await client.connect();
    const db = client.db("final-project");

    const update = await db
      .collection("news")
      .updateOne({ _id: ObjectId(id) }, { $set: newsData });

    if (update.modifiedCount === 1) {
      res.status(200).json({
        status: 200,
        message: "News updated!",
        data: newsData,
      });
    }
    client.close();
  } catch (err) {
    console.log("Error :", err);
  }
};

module.exports = {
  getAllNews,
  addNews,
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
  deleteNews,
  editNews,
};
