const {
  bcrypt,
} = require('./constants');

/**
 * Random String Generator - used for creating ShortURL and userId.
 */
const generateRandomString = function() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Get user by is Id. Deprecated function and not being used currently. Maintained for future use.
*/
const getUserById = function(users, userId) {
  let returnUser = {};

  for (const key of Object.keys(users)) {
    if (key === userId) {
      returnUser = (users[key]);
    }
  }
  return returnUser;
};

/**
 * Get User by Email. Search the user by his email address and send back the user object.
*/
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

/**
 * Returns an object with the registered users URL list.
 */
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

/**
 * Modular function to encrypt passwords. Currently not in use, due to issues in testing it out. Maintained for future use.
 */
const bcryptPwdHashSync = function(password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

/**
 * Modular function to compare encrypted passwords. Currently not in use, due to issues in testing it out. Maintained for future use.
 */

const bcryptCmprPwdSync = function(password, hashedPassword) {
  const compareFlag = bcrypt.compareSync(password, hashedPassword);
  return compareFlag;
};

module.exports = {
  generateRandomString,
  getUserById,
  getUserByEmail,
  getUrlsById,
  bcryptPwdHashSync,
  bcryptCmprPwdSync,
};