const PostModel = require("../model/Post");
const UserModel = require("../model/User");

const CreatePost = async (req, res) => {
   try {
      const newPost = {
         caption: req.body.caption,
         image: {
            public_id: "image id",
            url: "image url",
         },
         owner: req.user._id,
      };
      const Post = await PostModel.create(newPost);

      const user = await UserModel.findById(req.user._id);
      user.posts.push(Post._id);
      await user.save();

      res.status(200).json({
         status: true,
         Post,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

const likedunliked = async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
         return res.status(500).json({
            success: false,
            message: "bunday post mavjud emas",
         });
      }

      if (post.likes.includes(req.user._id)) {
         let index = post.likes.indexOf(req.user._id);
         post.likes.splice(index, 1);
         await post.save();

         return res.status(200).json({
            success: true,
            message: "postdan like o'chirildi",
         });
      } else {
         post.likes.push(req.user._id);
         await post.save();
         return res.status(200).json({
            success: true,
            message: "postga like bosildi",
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const DeletePost = async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);

      if (!post) {
         return res.status(404).json({
            success: false,
            message: "bunday post mavjud emas",
         });
      }

      if (post.owner.toString() !== req.user._id.toString()) {
         return res.status(401).json({
            success: false,
            message: "siz bu postni o'chira olmaysiz",
         });
      }
      await post.remove();

      const user = await UserModel.findById(req.user._id);

      const index = user.posts.indexOf(req.params.id);
      user.posts.splice(index, 1);
      await user.save();
      return res.status(200).json({
         success: true,
         message: "post deleted",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getPostofFollowing = async (req, res) => {
   try {
      const user = await UserModel.findById(req.user._id);

      const posts = await PostModel.find({
         owner: {
            $in: user.following,
         },
      });
      res.status(200).json({
         success: true,
         posts,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         success: false,
      });
   }
};

module.exports = { CreatePost, likedunliked, DeletePost, getPostofFollowing };
