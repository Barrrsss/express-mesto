const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с таким Id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара!' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const data = { ...req.body };

  User.create(data)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка при валидации' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser
}