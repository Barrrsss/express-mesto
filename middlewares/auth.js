const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'secretOrPrivateKey123');
    req.user = payload;
    next();
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
};
