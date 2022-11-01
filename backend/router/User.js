const express = require("express");

const UserController = require("../controller/User");
const { Isauthentication } = require("../middleware/Isauth");
const router = express.Router();

router.route("/register").post(UserController.Register);
router.route("/login").post(UserController.login);
router.route("/logout").get(UserController.logout);
router.route("/follow/:id").get(Isauthentication, UserController.follower);

module.exports = router;
