const jwt = require('jsonwebtoken');

const getUserId = (token) => {
  if (token) {
    const { userId } = jwt.verify(token, 'PASSWORD');
    return userId;
  }

  return '';
};

module.exports = { getUserId };
