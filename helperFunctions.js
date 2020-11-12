
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

module.exports = {
  getUserById,
  getUserByEmail,
  getUrlsById,
};