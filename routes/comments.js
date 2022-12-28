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

module.exports = router;
