const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { handleError } = require("../utils/errorHandler");

router.post("/", (req, res) => {
  console.log(chalk.yellowBright("in users registration"));
  res.send("in users registration");
});

router.post("/login", (req, res) => {
  console.log(chalk.yellowBright("in users login"));
  res.send("in users login");
});

router.use((req, res) => handleError(res, 404, "Page not found in users"));

module.exports = router;
