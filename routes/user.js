const router = require('express').Router();
const {
  getUsers, createUser, getUserId
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUserId);
router.post('/', createUser);




module.exports = router;
