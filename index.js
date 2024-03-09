import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 4000;
const mongooseConnection = "mongodb+srv://admin1:0mtEbDSJ9JjeT4vb@cluster0.obyfim1.mongodb.net/test"

// Mongoose Setup
mongoose.connect(mongooseConnection);

// Collection Schema
const postSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, "ID is Required"],
  },
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  content: {
    type: String,
    required: [true, "Content is Required"],
  },
  author: {
    type: String,
    required: [true, "Author is Required"],
  },
  date: {
    type: String,
    required: [true, "Date is Required"],
  },
});

// Database Model
const Post = mongoose.model("post", postSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", async (req, res) => {
  const allData = await Post.find();
  res.json(allData);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:_id", async (req, res) => {
  const filter = { _id: req.params._id };
  const specificPost = await Post.findOne(filter);
  if (specificPost) res.json(specificPost);
});

//CHALLENGE 3: POST a new post
app.post("/posts", async (req, res) => {
  const allData = await Post.find();
  const post = new Post({
    _id: Number(allData[allData.length - 1]._id) + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  });

  post.save().then(() => res.sendStatus(200));
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:_id", async (req, res) => {
  const query = { _id: req.params._id };
  const updateDoc = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };

  await Post.updateMany(query, updateDoc).then(() => res.sendStatus(200));
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:_id", async (req, res) => {
  const query = { _id: req.params._id };
  await Post.deleteOne(query).then(() => res.sendStatus(200));
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
