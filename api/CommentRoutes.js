const router = require("express").Router();
const { Comment } = require("../models/db");

router.get("/", async (req, res) => {
  const comments = await Comment.findAll({
    
  });
  try {
    res.send(comments);
  } catch (error) {
    res.status(300).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create({
      description: req.body.description,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
