const express = require("express");
const DB = require("../connect/DB");
const app = express();

const cookie = require("cookie-parser");
const ErrorHandler = require("../controller/errorController");
DB();
const colors = require("colors");

const PostRouter = require("../router/Post");
const RegisterRouter = require("../router/User");

app.use(express.json());
app.use(cookie());
app.use("/api/v1", PostRouter);
app.use("/api/v1", RegisterRouter);
app.use(ErrorHandler);

module.exports = app;

// aUEWSHvvgdrDSw0a
