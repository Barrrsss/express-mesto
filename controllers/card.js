const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка при валидации' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports.deleteCardByID = (req, res) => {
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

module.exports.likeCard = (req, res) => {
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

module.exports.dislikeCard = (req, res) => {
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
