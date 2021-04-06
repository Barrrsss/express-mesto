const { celebrate, Joi } = require('celebrate');
const errorMessage = require('../errors/ErrorMessages');

const {
  wrongName, wrongAbout, wrongLink, wrongAuth,
} = errorMessage;
const link = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .error(new Joi.ValidationError(wrongName)),
    link: Joi.string().min(18).required()
      .error(new Joi.ValidationError(wrongAbout)),
  }).unknown(true),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(link).required()
      .error(new Joi.ValidationError(wrongLink)),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateAvatar,
};
