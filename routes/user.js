const router = require('express').Router();

const {
  getUsers, getUserId, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUserId);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
