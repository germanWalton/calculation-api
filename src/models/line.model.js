const mongoose = require("mongoose");
const baseNumbersSchema = require("./base-numbers.model");

const lineSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  movement: { type: String, ref: "Movement", required: true },
  creator: {
    user: { type: String, ref: "User", default: null },
  },
  numbers: baseNumbersSchema,
});

module.exports = mongoose.model("Line", lineSchema);
