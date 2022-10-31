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

      const token = await jwt.sign({ _id: user._id }, "secret");

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

module.exports = { Register, login, logout };