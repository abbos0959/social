const express = require("express");
const DB = require("../connect/DB");
const app = express();
DB();
const colors = require("colors");

const PostRouter = require("../router/Post");
const RegisterRouter = require("../router/User");

app.use(express.json());
app.use("/api/v1", PostRouter);
app.use("/api/v1", RegisterRouter);

module.exports = app;

// aUEWSHvvgdrDSw0a
