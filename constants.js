const {
  generateRandomString,
  getUserById,
  getUserByEmail,
  getUrlsById,
  bcryptPwdHashSync,
  bcryptCmprPwdSync,
} = require('./helperFunctions');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');


module.exports = {
  generateRandomString,
  getUserById,
  getUserByEmail,
  getUrlsById,
  bcryptPwdHashSync,
  bcryptCmprPwdSync,
  morgan,
  app,
  PORT,
  bodyParser,
  bcrypt,
  cookieSession,
};