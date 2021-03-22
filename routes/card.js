const router = require('express').Router();

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
