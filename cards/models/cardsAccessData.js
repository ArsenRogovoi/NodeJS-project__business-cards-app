//This module responsible for connection to DB

const { handleBadRequest } = require("../../utils/errorHandler");
const Card = require("./mongodb/Card");
const config = require("config");

const DB = config.get("DB");

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve([]);
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const cards = Card.find({ user_id: userId });
      if (!cards) throw new Error("Could not find any card in the database");
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = Card.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const createCard = async (normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("create not in mongodb");
};

const updateCard = async (id, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      const card = Card.findByIdAndUpdate(id, normalizedCard, { new: true });
      if (!card)
        throw new Error(
          "Could not update this card because a card with this ID cannot be found in the database"
        );
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updated not in mongodb");
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      let card = Card.findById(cardId);
      if (!card)
        throw new Error(
          "Could not change card likes because a card with this ID cannot be found in the database"
        );
      const isLiked = card.likes.find((el) => el === userId);
      if (isLiked) {
        card.likes = card.likes.filter((el) => el !== userId);
        card = card.save();
      } else {
        card.likes.push(userId);
        card = card.save();
      }
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updated not in mongoDB");
};

const deleteCard = async (id) => {
  if (DB === "MONGODB") {
    try {
      const card = Card.findByIdAndDelete(id);
      if (!card)
        throw new Error(
          "Could not delete this card because a card with this ID cannot be found in the database"
        );
      return Promise.resolve(card);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
