const { assert } = require('chai');

const { getUserByEmail } = require('../helperFunctions.js');

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", users);
    const expectedOutput = {
      id: "userRandomID",
      email: "user@example.com",
      password: "purple-monkey-dinosaur"
    };
    // Write your assert statement here
    assert(user, expectedOutput);
  });
  it('should return a {} with invalid email', function() {
    const user = getUserByEmail("junk@email.com", users);
    const expectedOutput = {};
    // Write your assert statement here
    assert(user, expectedOutput);
  });
});