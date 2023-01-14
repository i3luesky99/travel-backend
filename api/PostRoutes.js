const router = require("express").Router();
const { Post } = require("../models/db");
const { User } = require("../models/db");
const { Comment } = require("../models/db");

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      user_id: req.body.user_id,
      content: req.body.content,
    });
    if (!req.body.content) {
      return res.status(300).json("Content must have");
    }
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.findAll({
    // raw: true,
    // where: {
    //   user_id: req.body.user_id,
    // },
    include: [{ model: User, as: "user" }],
  });

  // const user = await User.findAll({
  //   raw: true,
  //   attributes: ["email"],
  //   where: { id: req.body.user_id },
  //   include: [
  //     {
  //       model: Post,
  //       as: "posts",
  //       include: [
  //         {
  //           model: Comment,
  //           as: "comments",
  //         },
  //       ],
  //     },
  //   ],
  // });
  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(300).send(error);
  }
});

//Get the post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(parseInt(req.params.id), {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get the post by id including comments

router.get("/comments/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(parseInt(req.params.id), {
      // attributes: ["email"],
      // where: { id: req.body.user_id },
      include: [
        {
          model: Comment,
          as: "comment",
          // where: { id: req.body.user_id },
          // model: User,
          // as: "user",
          // include: [{ model: User, as: "user" }],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const count = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.body.user_id,
      },
    });

    if (count === 1) {
      res.status(200).json("The post has been deleted");
    } else {
      res.status(401).json("You can only delete your post ");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(parseInt(req.params.id), {
      where: {
        user_id: req.body.user_id,
      },
    });
    if (post) {
      await post.update({
        title: req.body.title,
        content: req.body.content,
        where: {
          user_id: req.body.user_id,
        },
      });
      res.status(200).json(post);
    } else {
      return res.status(400).json("This post is no longer resist");
    }
    // console.log("1231");
    // res.status(200).json(post)
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
