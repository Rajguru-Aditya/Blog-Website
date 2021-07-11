//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const blogSchema = {
  title: String,
  img: String,
  post: String,
};

const Blog = mongoose.model("Blog", blogSchema);

const aboutContent =
  "I am a passionate learner and developer. Interested in frontend. Besides programming, I love watching anime and reading and writing poems.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Blog.find({}, function (err, results) {
    if (!err) {
      res.render("home", { posts: results });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const title = req.body.postTitle;
  const content = req.body.postBody;
  const image = req.body.postImg;
  const post = new Blog({
    title: title,
    img: image,
    post: content,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
  //posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  const requestedId = req.params.postId;

  Blog.findOne({ _id: requestedId }, function (err, result) {
    if (!err) {
      res.render("post", {
        postTitle: result.title,
        postContent: result.post,
        postImg: result.img,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
