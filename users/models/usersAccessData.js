const { handleBadRequest } = require("../../utils/errorHandler");
const User = require("./mongodb/User");
const lodash = require("lodash");

const DB = process.env.DB || "MONGODB";

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");
      user = new User(normalizedUser);
      user = await user.save();
      user = lodash.pick(user, ["_id", "name", "email"]);
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("register not in mongodb");
};

const login = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = User.findOne({ email });
      if (!user) throw new Error("Invalid email or password");
      return Promise.resolve("user is logged in");
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("login not in mongodb");
};

exports.login = login;
exports.registerUser = registerUser;
