const express = require("express");

const UserController = require("../controller/User");
const { Isauthentication } = require("../middleware/Isauth");
const router = express.Router();

router.route("/register").post(UserController.Register);
router.route("/login").post(UserController.login);
router.route("/logout").get(UserController.logout);
router.route("/follow/:id").get(Isauthentication, UserController.follower);

router.route("/update/password").patch(Isauthentication, UserController.updatePassword);
router.route("/update/profile").patch(Isauthentication, UserController.updateProfile);
router.route("/delete/me").delete(Isauthentication, UserController.deleteProfile);
router.route("/me").get(Isauthentication, UserController.myProfile);
router.route("/forgot/password").post(Isauthentication, UserController.forgotpassword);
router.route("/password/reset/:token").patch(UserController.resetPassword);

router.route("/user/:id").get(Isauthentication, UserController.getUserProfile);
router.route("/users").get(Isauthentication, UserController.getAllusers);

module.exports = router;
