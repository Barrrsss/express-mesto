const Card = require('../models/card');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Вы не заполнили обязательные поля или данные не верны'));
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFound('Карточка с таким id не найдена!'))
    .then((card) => {
      if (card.owner._id.toString() === req.user._id) {
        card.remove();
        res.send({ message: 'Карточка удалена' });
      } else {
        throw new Forbidden('Недостаточно прав для удаления карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неправильный id'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFound('Карточка с таким id не найдена!'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неправильный id'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFound('Карточка с таким id не найдена!'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неправильный id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
