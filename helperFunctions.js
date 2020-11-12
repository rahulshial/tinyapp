const {
  bcrypt,
} = require('./constants');

const getUserById = function(users, userId) {
  let returnUser = {};

  for (const key of Object.keys(users)) {
    if (key === userId) {
      returnUser = (users[key]);
    }
  }
  return returnUser;
};

const getUserByEmail = function(users, email) {
  let returnUser = {};

  for (const key of Object.keys(users)) {
    if (users[key]['email'] === email) {
      returnUser = users[key];
      return returnUser;
    }
  }
  return returnUser;
};

const getUrlsById = function(urlDatabase, userId) {
  let returnObject = {};

  for (let url in urlDatabase) {
    if (urlDatabase[url]['userID'] === userId) {
      returnObject[url] = {
        longURL: urlDatabase[url]['longURL'],
        userID: urlDatabase[url]['userID']
      };
    }
  }
  return returnObject;
};

const bcryptPwdHashSync = function(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

const bcryptCmprPwdSync = function(password, hashedPassword) {
  const compareFlag = bcrypt.compareSync(password, hashedPassword);
  return compareFlag;
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUrlsById,
  bcryptPwdHashSync,
  bcryptCmprPwdSync,
};