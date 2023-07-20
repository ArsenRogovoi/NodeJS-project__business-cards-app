const express = require("express");
const router = express.Router();
const chalk = require("chalk");

router.post("/", (req, res) => {
  console.log(chalk.yellowBright("in users registration"));
  res.send("in users registration");
});

router.post("/login", (req, res) => {
  console.log(chalk.yellowBright("in users login"));
  res.send("in users login");
});

module.exports = router;
