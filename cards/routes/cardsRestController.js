//this module responsible for end-points of cards.

const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { handleError } = require("../../utils/errorHandler");
const {
  getCards,
  createCard,
  like,
  remove,
  getCard,
  getMyCards,
  update,
} = require("../models/cardsAccessData");
const validateCard = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", async (req, res) => {
  try {
    const userId = "123456";
    const cards = await getMyCards(userId);
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let card = req.body;

    const { error } = validateCard(req.body); //validation of JOI or other validator
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    card = await normalizeCard(req.body);
    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const id = req.params;
    const card = await update(id, req.body);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/", async (req, res) => {
  try {
    const id = req.params;
    const userId = "123456";
    const card = await like(id, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const id = req.params;
    const card = await remove(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
