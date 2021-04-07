const { isCelebrateError } = require('celebrate');

const errors = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({ message: err.details.get('body').message });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Неверный запрос' });
  } else if (!err.code) {
    res.status(500).send({ message: 'Ошибка сервера или неверный запрос' });
  } else {
    res.status(err.code).send({ message: err.message });
  }

  next();
};

module.exports = {
  errors,
};
