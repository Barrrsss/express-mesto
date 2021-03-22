const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');

router.use('/user', userRouter);
router.use('/card', cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: `По адресу ${req.path} ничего нет` });
});

module.exports = router;
