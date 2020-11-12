// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "T3E4F9" },
  "b2xVn3": { longURL: "http://www.timesofindia.com", userID: "T3E4F9" },
  "9sm5xK": { longURL: "http://www.google.com", userID: "T2R0E7"},
  "b2xVn4": { longURL: "http://www.mumbaimirror.com", userID: "T3E4F9" },
};

const users = {
  "T3E4F9": {
    id: "T3E4F9",
    email: "user@example.com",
    password: "purple"
  },
  "T2R0E7": {
    id: "T2R0E7",
    email: "user2@example.com",
    password: "funk"
  }
};

module.exports = {
  urlDatabase,
  users,
};

