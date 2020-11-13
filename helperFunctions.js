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


module.exports = {
  generateRandomString,
  getUserByEmail,
  getUrlsById,
};