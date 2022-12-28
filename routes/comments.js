const express = require("express");
const router = express.Router();
const Comment = require("./schema/comment");

router.get("/", async (_, res) => {
  try {
    const comments = await Comment.find().select(["-password"]);
    res.json({ data: comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;

  if (!req.body) {
    return res.json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  const { user, content, password } = req.body;

  try {
    const comment = await Comment.create({
      user,
      content,
      password,
      postId,
    });
    res.json({ data: comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId });
    res.json({ data: comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
