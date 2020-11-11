const getUser = function(users, userId) {
  // return users
  //   .filter(value => value.userId === userId);
  const returnUser = {};
  for (const userId in Object.keys(users)) {
    console.log(users.userId);
  }
};

module.exports = getUser;