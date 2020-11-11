const generateRandomString = require('./generateRandomString');
const getUser = require('./getUser');
const express = require('express');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = {
  generateRandomString,
  getUser,
  app,
  PORT,
  bodyParser,
  cookieParser,
};