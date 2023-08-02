//This module responsible for connection to DB

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not find cards in the database!");
      return Promise.resolve("in getCards");
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("getCards not in mongodb");
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not find cards in the database (getMyCards)!");
      return Promise.resolve(`my cards ${userId}`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("getMyCards not in mongodb");
};

const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not find card in the database (getCard)!");
      return Promise.resolve(`card no. ${cardId}`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("getCard not in mongodb");
};

const create = async (normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not create card in the database (create)!");
      normalizedCard._id = "123456";
      return Promise.resolve(normalizedCard);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("create not in mongodb");
};

const update = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not update card in the database (update)!");
      return Promise.resolve(`card no. ${cardId} updated`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("update not in mongodb");
};

const like = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not like card in the database (like)!");
      return Promise.resolve(`card no. ${cardId} liked`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("like not in mongodb");
};

const remove = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not delete card in the database (remove)!");
      return Promise.resolve(`card no. ${cardId} deleted`);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("remove not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.create = create;
exports.update = update;
exports.like = like;
exports.remove = remove;
