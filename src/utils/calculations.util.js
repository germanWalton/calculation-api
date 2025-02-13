const formatCurrency = (number) => {
  return `$ ${number.toFixed(2)}`;
};

const formatPercentage = (number) => {
  return `${number.toFixed(2)} %`;
};

const calculateBudgetUtility = (sumPrice, sumBudget) => {
  return sumPrice - sumBudget;
};

const calculateBudgetMargin = (budgetUtility, sumPrice) => {
  return sumPrice > 0 ? (budgetUtility / sumPrice) * 100 : 0;
};

const updateNumbers = (numbers, newSumPrice = null, newSumBudget = null) => {
  const sumPrice = newSumPrice ?? numbers.sumPrice.number;
  const sumBudget = newSumBudget ?? numbers.sumBudget.number;

  const budgetUtility = calculateBudgetUtility(sumPrice, sumBudget);
  const budgetMargin = calculateBudgetMargin(budgetUtility, sumPrice);

  return {
    sumPrice: {
      value: formatCurrency(sumPrice),
      lastValue: numbers.sumPrice.value,
      number: sumPrice,
      lastNumber: numbers.sumPrice.number,
    },
    sumBudget: {
      value: formatCurrency(sumBudget),
      lastValue: numbers.sumBudget.value,
      number: sumBudget,
      lastNumber: numbers.sumBudget.number,
    },
    budgetUtility: {
      value: formatCurrency(budgetUtility),
      lastValue: numbers.budgetUtility.value,
      number: budgetUtility,
      lastNumber: numbers.budgetUtility.number,
    },
    budgetMargin: {
      value: formatPercentage(budgetMargin),
      lastValue: numbers.budgetMargin.value,
      number: budgetMargin,
      lastNumber: numbers.budgetMargin.number,
    },
  };
};

module.exports = { updateNumbers };
