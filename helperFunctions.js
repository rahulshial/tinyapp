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
  return bcrypt.hashSync(password, 10);
};

const bcryptCmprPwdSync = function(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
};

// const users = {
//   "T3E4F9": {
//     id: "T3E4F9",
//     email: "user@example.com",
//     password: "$2b$10$3Qb0UlyLf8dElD7Q1/AEIukna2J81aRjyVEkC8HwMPbs82gZRempy"
//   },
//   "T2R0E7": {
//     id: "T2R0E7",
//     email: "user2@example.com",
//     password: "$2b$10$cRC/EINIa8bFDxh1huczo.GgAYykrZyRj2Ln08u.LZhkfxdeKlTPS"
//   }
// };


// console.log(bcryptPwdHashSync('purple'));
// console.log(bcryptPwdHashSync('funk'));

// console.log(bcryptCmprPwdSync('purple', users['T3E4F9']['password']));

module.exports = {
  getUserById,
  getUserByEmail,
  getUrlsById,
  bcryptPwdHashSync,
  bcryptCmprPwdSync,
};