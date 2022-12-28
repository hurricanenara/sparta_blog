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

module.exports = router;
