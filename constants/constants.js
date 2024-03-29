const {
  generateRandomString,
  getUserByEmail,
  getUrlsById,
} = require('../helpers/helperFunctions');
const express = require('express');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override')


module.exports = {
  generateRandomString,
  getUserByEmail,
  getUrlsById,
  app,
  PORT,
  bodyParser,
  bcrypt,
  cookieSession,
  methodOverride,
};