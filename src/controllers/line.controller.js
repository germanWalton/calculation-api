const LineService = require("../services/line.service");

exports.createLine = async (req, res) => {
  try {
    const { name, movementId } = req.body;
    const line = await LineService.createLine(name, movementId, req.user._id);
    res.status(201).json({ line });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLinesByMovement = async (req, res) => {
  try {
    const { movementId } = req.params;
    const lines = await LineService.getLinesByMovement(movementId, req.user._id);
    res.status(200).json({ lines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLines = async (req, res) => {
  try {
    const { lineIds } = req.body;
    const response = await LineService.deleteLines(lineIds, req.user._id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLineNumbers = async (req, res) => {
  try {
    const { lineId } = req.params;
    const { sumPrice, sumBudget } = req.body;
    const updatedData = await LineService.updateLineNumbers(
      lineId,
      sumPrice,
      sumBudget,
      req.user._id
    );
    res.status(200).json({ updatedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
