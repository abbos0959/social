const express = require("express");

const PostController = require("../controller/Post");

const Isauthentication = require("../middleware/Isauth");
const router = express.Router();

router.route("/post/upload").post(Isauthentication.Isauthentication, PostController.CreatePost);
router
   .route("/post/:id")
   .get(Isauthentication.Isauthentication, PostController.likedunliked)
   .delete(Isauthentication.Isauthentication, PostController.DeletePost);

module.exports = router;
