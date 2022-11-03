const express = require("express");
const postsRouter = express.Router();
const { getAllPosts, createPost } = require("../db");
const { requireUser } = require("./utils");

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;
  console.log(req.body, "this is new test");

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.content = content;
    postData.title = title;
    postData.authorId = req.user.id;
    console.log(req.user, "this is!!!!");
    const post = await createPost(postData);

    res.send({ post });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.get("/", async (req, res, next) => {
  const posts = await getAllPosts();

  res.send({
    posts,
  });
});

module.exports = postsRouter;
