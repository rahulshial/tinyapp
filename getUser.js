const getUser = function(users, userId) {
  return users
    .filter(value => value.userId === userId);
};

module.exports = {
  getUser,
}