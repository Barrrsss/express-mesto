const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictingRequest = require('../errors/ConflictingRequest');
const Unauthorized = require('../errors/Unauthorized');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Пользователь с таким Id не существует');
    })
    .then(({ _id }) => {
      User.findById(_id)
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequest('Неправильный id');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((({ _id }) => User.findById(_id)))
    .then((user) => {
      res.send(user.toJSON());
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ошибка при создании пользователя');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequest('Пользователь с таким E-mail уже существует');
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true, upsert: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequest('Данные пользователя не корректны');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с таким Id не существует');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Ссылка на аватар не корректна');
      } else if (err.name === 'CastError') {
        throw new BadRequest('Id не корректен');
      }
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secretOrPrivateKey123',
        { expiresIn: 604800000 },
      );

      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      throw new Unauthorized(`Пользователь не авторизован + ${err.message}`);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному _id не найден!');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new NotFound('Пользователь по указанному _id не найден!');
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUser,
};
