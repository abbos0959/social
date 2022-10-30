const express = require("express");

const UserController = require("../controller/User");
const router = express.Router();

router.route("/register").post(UserController.Register);
router.route("/login").post(UserController.login);

module.exports = router;
