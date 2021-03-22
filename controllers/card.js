const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (!name || !link) {
        return res.status(400).send({
          message: `Ошибка: ${err}. Вы не заполнили обязательные поля`,
        });
      }
      return res.status(500).send({
        message: `Ошибка: ${err}`,
      });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с таким Id не найдена!' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка ${err}` }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с таким Id не найдена!' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка при валидации' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с таким Id не найдена!' });
      res.send(card);
    }
  })
    .catch((err) => res.status(500).send({ message: `Ошибка ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
