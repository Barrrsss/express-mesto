const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(require('./routes/auth'));

app.use(auth);

app.use(router);

app.listen(PORT, () => {

});
