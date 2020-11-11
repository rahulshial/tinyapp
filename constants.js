const generateRandomString = require('./generateRandomString');
const { getUserById, getUserByEmail } = require('./getUser');
// const getUserByEmail = require('./getUser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = {
  generateRandomString,
  getUserById,
  getUserByEmail,
  morgan,
  app,
  PORT,
  bodyParser,
  cookieParser,
};