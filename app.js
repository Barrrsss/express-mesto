const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const { serverError } = require('./middlewares/ServerError');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(require('./routes/auth'));

app.use(auth);

app.use(router);

app.use(errors());

app.use(serverError);

app.listen(PORT, () => {

});
