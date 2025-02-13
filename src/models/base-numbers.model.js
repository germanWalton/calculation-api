const baseNumbersSchema = {
  sumPrice: {
    value: { type: String, default: "$ 0" },
    lastValue: { type: String, default: "$ 0" },
    number: { type: Number, default: 0 },
    lastNumber: { type: Number, default: 0 },
  },
  sumBudget: {
    value: { type: String, default: "$ 0" },
    lastValue: { type: String, default: "$ 0" },
    number: { type: Number, default: 0 },
    lastNumber: { type: Number, default: 0 },
  },
  budgetUtility: {
    value: { type: String, default: "$ 0" },
    lastValue: { type: String, default: "$ 0" },
    number: { type: Number, default: 0 },
    lastNumber: { type: Number, default: 0 },
  },
  budgetMargin: {
    value: { type: String, default: "0 %" },
    lastValue: { type: String, default: "0 %" },
    number: { type: Number, default: 0 },
    lastNumber: { type: Number, default: 0 },
  },
};

module.exports = baseNumbersSchema;
