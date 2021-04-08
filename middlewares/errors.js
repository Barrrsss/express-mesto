const { isCelebrateError } = require('celebrate');

const errors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.send({ message: err.details.get('body').message });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Ошибка сервера или неверный запрос' : message,
    });
  }

  next();
};

module.exports = {
  errors,
};
