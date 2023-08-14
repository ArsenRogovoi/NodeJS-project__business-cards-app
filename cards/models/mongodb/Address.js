const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  state: {
    type: String,
    minLength: 2,
  },
  country: {
    type: String,
    minLength: 2,
    required: true,
  },
  city: {
    type: String,
    minLength: 2,
    required: true,
  },
  street: {
    type: String,
    minLength: 2,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  zip: Number,
});

module.exports = addressSchema;
