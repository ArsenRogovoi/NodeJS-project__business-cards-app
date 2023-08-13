const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const { register, login } = require("../models/usersAccessData");
const {validateRegistration, validateLogin} = require('../validations/userValidationService')

router.post("/", async (req, res) => {
  try {
    const {error} = validateRegistration(req.body);
    if(error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const user = await register(req.body);
    return res.send(user).status(201);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const {error} = validateLogin(req.body);
    if(error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const user = await login(req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.use((req, res) => handleError(res, 404, "Page not found in users"));

module.exports = router;
