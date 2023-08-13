const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const { handleError } = require("./utils/errorHandler");
const cors = require("./cors/cors");
const logger = require("./logger/loggerAdaptor");
const connectToDb = require("./db/dbService");

app.use(logger);
// app.use(cors);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = 8181;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`listening to https//localhost:${PORT}`));
  connectToDb();
});
