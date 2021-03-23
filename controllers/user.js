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
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id не корректен' });
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
        res.status(400).send({ message: 'Ошибка при создании пользователя' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { id } = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с таким Id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Данные не корректны' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { id } = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с таким Id не существует' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ссылка на аватар не корректен' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Id не корректен' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
