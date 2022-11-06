const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const PostModel = require("../model/Post");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const Register = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const checkuser = await UserModel.findOne({ email });

      if (checkuser) {
         return res.status(400).json({
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
      const token = await jwt.sign({ id: user._id }, "secret");

      const options = {
         maxAge: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
         httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
         success: true,
         user,
         token,
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

const updatePassword = async (req, res) => {
   try {
      const user = await UserModel.findById(req.user._id);

      const { oldpassword, newpassword } = req.body;

      if (!oldpassword || !newpassword) {
         return res.status(404).json({
            status: false,
            message: "siz eski va yangi parollarni kiritishingiz shart",
         });
      }
      const comparePassword = await bcrypt.compare(oldpassword, user.password);

      if (!comparePassword) {
         return res.status(400).json({
            success: false,
            message: error.message,
         });
      }
      const hashPassword = await bcrypt.hash(newpassword, 12);

      user.password = hashPassword;
      await user.save();

      res.status(200).json({
         success: true,
         message: "parol yangilandi",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const updateProfile = async (req, res) => {
   try {
      const user = await UserModel.findById(req.user._id);

      const { name, email } = req.body;

      if (!name && !email) {
         return res.status(400).json({
            success: false,
            message: "siz name va email kiritmadingiz",
         });
      }
      if (name) {
         user.name = name;
      }
      if (email) {
         user.email = email;
      }

      await user.save();
      res.status(200).json({
         success: true,
         message: "profile yangilandi",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const deleteProfile = async (req, res) => {
   try {
      const user = await UserModel.findById(req.user._id);

      const posts = user.posts;
      const followers = user.followers;
      const following = user.following;
      const userId = user._id;
      await user.remove();
      //user profilini o'chirgandan keyin cookieni tozalash
      res.clearCookie("token", null, {
         maxAge: new Date(Date.now()),
         httpOnly: true,
      });

      //userning barcha postlarini o'chirish
      for (let i = 0; i < posts.length; i++) {
         const post = await PostModel.findById(posts[i]);
         await post.remove();
      }

      for (let i = 0; i < followers.length; i++) {
         const follower = await UserModel.findById(followers[i]);
         // await follower.remove();
         const index = follower.following.indexOf(userId);

         follower.following.splice(index, 1);

         await follower.save();
         console.log(follower, "follllllllll");
      }
      for (let i = 0; i < following.length; i++) {
         const followin = await UserModel.findById(following[i]);
         // await follower.remove();
         const index = followin.followers.indexOf(userId);

         followin.followers.splice(index, 1);

         await followin.save();
         console.log(followin, "follllllllll");
      }
      res.status(200).json({
         status: true,
         message: "profile o'chirildi",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
         status: false,
      });
   }
};

const myProfile = async (req, res) => {
   try {
      const user = await UserModel.findById(req.user._id).populate("posts");
      res.status(200).json({
         success: true,
         user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getUserProfile = async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.id).populate("posts");

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "bunday user mavjud emas",
         });
      }

      res.status(200).json({
         success: true,
         user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getAllusers = async (req, res) => {
   try {
      const user = await UserModel.find();
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "Hozircha userlar mavjud emas",
         });
      }

      res.status(200).json({
         length: user.length,
         success: true,
         user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const forgotpassword = async (req, res) => {
   try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "bunday user mavjud emas",
         });
      }

      const resetPasswordToken = user.getResetPasswordToken();

      await user.save();

      const resetPasswordUrl = `${req.protocol}://${req.get(
         "host"
      )}/api/v1/password/reset/${resetPasswordToken}`;

      const message = `sizning  parolingiz  tiklash tokeni ${resetPasswordUrl}`;

      try {
         await sendEmail({
            email: user.email,
            subject: "parolingizni tiklash tokeni",
            message,
         });
         res.status(200).json({
            message: "emailga token yuborildi",
         });
      } catch (error) {
         (user.resetPasswordToken = undefined), (user.resetPasswordExpire = undefined);
         await user.save({ validateBeforeSave: false });
         res.status(500).json({
            success: false,
            message: error.message,
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const resetPassword = async (req, res) => {
   try {
      const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

      const user = await UserModel.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "token Xatolik mavjud",
         });
      }

      const hashPassword1 = await bcrypt.hash(req.body.password, 12);
      user.password = hashPassword1;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(200).json({
         success: true,
         message: "parol yangilandi",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};
module.exports = {
   Register,
   login,
   logout,
   follower,
   updatePassword,
   updateProfile,
   deleteProfile,
   myProfile,
   getUserProfile,
   getAllusers,
   forgotpassword,
   resetPassword,
};
