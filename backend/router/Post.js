const express = require("express");

const PostController = require("../controller/Post");
const router = express.Router();

router.route("/post/upload").post(PostController.CreatePost);

module.exports = router;
