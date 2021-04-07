const router = require('express').Router();

const {
  getUsers, getUserId, getUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/user');

const {
  validateUser,
  validateAvatar,
} = require('../middlewares/Validation');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', getUserId);

router.patch('/me', validateUser, updateUserInfo);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
