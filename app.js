//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent =
  "I am a passionate learner and developer. Interested in frontend. Besides programming, I love watching anime and reading and writing poems.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { posts: posts });
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
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    image: req.body.postImg,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    let storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        postTitle: post.title,
        postContent: post.content,
        postImg: post.image,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
