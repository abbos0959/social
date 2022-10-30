const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("User", UserSchema);
