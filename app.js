const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();


const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(router);

app.listen(PORT, () => {

});