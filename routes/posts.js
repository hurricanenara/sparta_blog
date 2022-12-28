const express = require("express");
const router = express.Router();
const Post = require("./schema/post");

router.get("/", async (_, res) => {
  try {
    const posts = await Post.find().select(["-password"]); // [{}, {}, {}]
    res.json({ data: posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { user, title, content, password } = req.body;

  try {
    const post = await Post.create({
      user,
      title,
      content,
      password,
    });
    res.json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // .find({id})
  // .findOne({id})
  //   .findById
  try {
    const post = await Post.findById(id).select(["-password"]);
    res.json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
