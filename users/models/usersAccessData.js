const DB = process.env.DB || "MONGODB";

const register = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      //   throw new Error("Can not register in the database!");
      normalizedUser._id = "123456";
      return Promise.resolve(normalizedUser);
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
exports.register = register;
