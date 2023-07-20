const express = require("express");
const router = express.Router();
const chalk = require("chalk");

router.get("/", (req, res) => {
  console.log(chalk.yellowBright("in cards get"));
  res.send("in cards get");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(chalk.yellowBright("in cards get params"));
  res.send("in cards get params");
});

router.post("/", (req, res) => {
  console.log(chalk.yellowBright("in cards post"));
  res.send("in cards post");
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(chalk.yellowBright("in cards put"));
  res.send("in cards put");
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  console.log(chalk.yellowBright("in cards patch"));
  res.send("in cards patch");
});

router.delete("/:id", (req, res) => {
  console.log(chalk.yellowBright("in cards delete"));
  res.send("in cards delete");
});

module.exports = router;
