const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized('Необходима авторизация');
    }
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, 'secretOrPublicKey123');
    } catch (err) {
      throw new Unauthorized('Необходима авторизация');
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
