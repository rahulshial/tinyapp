
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
      // return true;
    }
  }
  return returnUser;
  // return false;
};


module.exports = {
  getUserById,
  getUserByEmail,
};