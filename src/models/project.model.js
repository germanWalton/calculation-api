const mongoose = require("mongoose");
const baseNumbersSchema = require("./base-numbers.model");

const projectSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  creator: {
    user: { type: String, ref: "User", default: null },
  },
  numbers: baseNumbersSchema,
});
projectSchema.index({ name: "text" });

module.exports = mongoose.model("Project", projectSchema);
