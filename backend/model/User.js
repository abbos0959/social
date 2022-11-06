const mongoose = require("mongoose");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Iltimos Ism Kiriting"],
      trim: true,
   },
   email: {
      type: String,
      required: [true, "Iltimos email kiriting"],
      unique: [true, "bunday email avvaldan mavjud"],
   },

   avatar: {
      public_id: String,
      url: String,
   },
   password: {
      type: String,
      required: [true, "Iltimos parol kiriting"],
      minlength: [6, "Siz kamida 6 ta belgidan iborat parol kiritishingiz kerak"],
   },
   posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post",
      },
   ],
   followers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],

   following: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   resetPasswordToken: String,
   resetPasswordExpire: Date,
});

UserSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex");

   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
   return resetToken;
};
module.exports = mongoose.model("User", UserSchema);
