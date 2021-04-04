const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, 'secretOrPublicKey');
    } catch (err) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
