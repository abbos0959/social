const PostModel = require("../model/Post");

const CreatePost = async (req, res) => {
   try {
      const Post = await PostModel.create(req.body);

      req.status(200).json(Post);
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

module.exports = { CreatePost };
