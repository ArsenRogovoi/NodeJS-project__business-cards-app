const User = require("./mongodb/User");

const DB = process.env.DB || "MONGODB";

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = new User(normalizedUser);
      console.log(normalizedUser);
      user = await user.save();
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("register not in mongodb");
};

const login = async (user) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not login!");
      return Promise.resolve("in login");
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("login not in mongodb");
};

exports.login = login;
exports.registerUser = registerUser;
