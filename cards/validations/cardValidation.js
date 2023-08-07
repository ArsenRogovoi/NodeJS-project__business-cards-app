const Joi = require('joi');

const schema = Joi.object({name: Joi.string()});
const user = {name: 'David'};
const {error} = schema.validate(user);
if (error) return console.log(error.details[0].message);
console.log('valid!');