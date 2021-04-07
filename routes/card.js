const router = require('express').Router();
const {
  validateCard,
  validateId,
} = require('../middlewares/Validation');

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateId, deleteCardById);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

module.exports = router;
