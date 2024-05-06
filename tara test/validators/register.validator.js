//* validators/register.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    name: Joi.string().min(1).required(),
    password: Joi.string().min(4).required(),

});

module.exports = registerSchema;