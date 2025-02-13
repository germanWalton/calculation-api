const MovementService = require("../services/movement.service");

exports.createMovement = async (req, res) => {
  try {
    const { name, projectId } = req.body;
    const movement = await MovementService.createMovement(name, projectId, req.user._id);
    res.status(201).json({ movement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMovementsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const movements = await MovementService.getMovementsByProject(projectId, req.user._id);
    res.status(201).json({ movements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMovements = async (req, res) => {
  try {
    const { ids } = req.body;
    const response = await MovementService.deleteMovements(ids, req.user._id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
