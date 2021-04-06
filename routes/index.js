const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const auth = require('./auth');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: `По адресу ${req.path} ничего нет` });
});

module.exports = router;
