const {
  generateUserPassword,
  comparePassword,
} = require("../../cards/helpers/bcrypt");
const { handleBadRequest } = require("../../utils/errorHandler");
const User = require("./mongodb/User");
const lodash = require("lodash");
const config = require("config");

const DB = config.get("DB");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;

      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user.password = generateUserPassword(user.password);
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

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid email or password");

      return Promise.resolve("user is logged in");
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

exports.login = login;
exports.registerUser = registerUser;
