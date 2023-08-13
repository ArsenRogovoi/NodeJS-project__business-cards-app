const ENVIRONMENT = process.env.ENVIRONMENT || "dev";
// const ENVIRONMENT = "prod";

const connectToDb = () => {
  if (ENVIRONMENT === "dev") require("./dataBases/connectToMongoDB");
  if (ENVIRONMENT === "prod") require("./dataBases/connectToAtlas");
};

module.exports = connectToDb;
