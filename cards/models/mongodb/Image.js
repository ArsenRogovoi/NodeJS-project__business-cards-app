const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  url: {
    type: String,
    match: RegExp(
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,4})?(\/[a-zA-Z0-9-%@:;.,~#&+=?]*\b(?:\/[a-zA-Z0-9-%@:;.,~#&+=?]+)*\/?)?$/
    ),
  },
  alt: {
    type: String,
    minLength: 2,
  },
});

module.exports = imageSchema;
