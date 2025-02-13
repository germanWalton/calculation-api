const mongoose = require("mongoose");
const baseNumbersSchema = require("./base-numbers.model");

const movementSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  project: { type: String, ref: "Project", required: true },
  creator: {
    user: { type: String, ref: "User", default: null },
  },
  numbers: baseNumbersSchema,
});

module.exports = mongoose.model("Movement", movementSchema);
