const router = require('express').Router();
const {
  validateCard,
} = require('../middlewares/Validation');

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
