const { celebrate, Joi } = require('celebrate');

const link = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).required(),
  }).unknown(true),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(link).required(),
  }).unknown(true),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(link).required(),
  }).unknown(true),
});

const validateSigIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }).unknown(true),
});

const validateSigUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.empty':
            err.message = 'Value should not be empty!';
            break;
          case 'string.min':
            err.message = 'Value should have at least 2 characters!';
            break;
          case 'string.max':
            err.message = 'Value should have at most 1 characters!';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(link),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).error(new Error('Email is a required field!')),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateAvatar,
  validateCard,
  validateSigIn,
  validateSigUp,
  validateId,
};
