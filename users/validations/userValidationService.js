const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");
const editValidation = require("./Joi/editValidation");

const validator = undefined || "Joi";

const validateRegistration = (user) => {
  if (validator === "Joi") {
    return registerValidation(user);
  }
};

const validateLogin = (user) => {
  if (validator === "Joi") {
    return loginValidation(user);
  }
};

const validateUserToEdit = (user) => {
  if (validator === "Joi") {
    return editValidation(user);
  }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateUserToEdit = validateUserToEdit;
