
const getUser = function(users, userId) {
  let returnUser = {};

  for (const key of Object.keys(users)) {
    if (key === userId) {
      returnUser = (users[key]);
    }
  }
  return returnUser;
};

module.exports = getUser;