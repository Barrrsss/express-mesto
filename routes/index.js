const router = require('express').Router();
const userRouter = require('./user');

router.use('/user', userRouter);

router.use((req, res) => {
  res.status(404).send({ message: `По адресу ${req.path} ничего нет` });
});

module.exports = router;
