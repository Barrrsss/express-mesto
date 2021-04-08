const router = require('express').Router();

const {
  getUsers, getUserId, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/user');

const {
  validateUser,
  validateAvatar,
  validateId,
} = require('../middlewares/Validation');

router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', validateUser, updateUserInfo);

router.get('/:id', validateId, getUserId);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
