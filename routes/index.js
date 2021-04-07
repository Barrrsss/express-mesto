const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const auth = require('./auth');
const NotFound = require('../errors/NotFound');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use((req) => {
  throw new NotFound(`По адресу ${req.path} ничего нет`);
});

module.exports = router;
