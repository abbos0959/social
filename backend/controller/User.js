const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const checkuser = await UserModel.findOne({ email });

      if (checkuser) {
         res.status(400).json({
            message: "bunday user allaqachon mavjud",
         });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const user = await UserModel.create({
         name,
         email,
         password: hashPassword,
         avatar: { public_id: "salom", url: "qalesan" },
      });

      res.status(201).json({
         status: true,
         user,
      });
   } catch (error) {
      res.status(500).json({
         status: false,
         message: error.message,
      });
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
         res.status(404).json({
            message: "bunday user mavjud emas",
         });
      }
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
         res.status(400).json({
            message: "parol xato kiritildi",
         });
      }

      const token = await jwt.sign({ id: user._id }, "secret");

      res.status(200)
         .cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
         })
         .json({
            success: true,
            user,
            token,
         });
   } catch (error) {}
};
const logout = async (req, res) => {
   res.clearCookie("token", null, {
      maxAge: new Date(Date.now()),
      httpOnly: true,
   });
   res.status(200).json({
      message: true,
      message: "Logout User",
   });
};

const follower = async (req, res) => {
   try {
      const userFollow = await UserModel.findById(req.params.id);

      const loggedInUser = await UserModel.findById(req.user._id);

      if (!userFollow) {
         return res.status(404).json({
            success: false,
            message: "bunday user topilmadi",
         });
      }
      if (loggedInUser.following.includes(userFollow._id)) {
         const indexFollowing = loggedInUser.following.indexOf(userFollow._id);
         const indexFollowers = userFollow.followers.indexOf(loggedInUser._id);
         loggedInUser.following.splice(indexFollowing, 1);
         userFollow.followers.splice(indexFollowers, 1);
         await loggedInUser.save();
         await userFollow.save();
         return res.status(400).json({
            success: false,
            message: "siz obunani bekor qildingiz",
         });
      } else {
         loggedInUser.following.push(userFollow._id);

         userFollow.followers.push(loggedInUser._id);

         await loggedInUser.save();
         await userFollow.save();
         res.status(200).json({
            success: true,
            message: "siz obuna bo'ldingiz",
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = { Register, login, logout, follower };
