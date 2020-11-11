const generateRandomString = require('./generateRandomString');
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");

module.exports = {
  generateRandomString,
  app,
  PORT,
  bodyParser
};