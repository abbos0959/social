const express = require("express");

const UserController = require("../controller/User");
const router = express.Router();

router.route("/register").post(UserController.Register);
router.route("/login").post(UserController.login);
router.route("/logout").get(UserController.logout);

module.exports = router;
