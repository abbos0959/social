const express = require("express");
const DB = require("../connect/DB");
const app = express();
DB();
const colors = require('colors');

app.use(express.json());

module.exports = app;

// aUEWSHvvgdrDSw0a
