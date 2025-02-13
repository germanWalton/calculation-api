const Movement = require("../models/movement.model");
const Project = require("../models/project.model");
const { updateNumbers } = require("../utils/calculations.util");

class MovementService {
  async createMovement(name, projectId, userId) {
    const project = await Project.findOne({
      _id: projectId,
      "creator.user": userId,
    });

    if (!project) {
      throw new Error("Project not found");
    }
    return await Movement.create({ name, project: projectId, creator: { user: userId } });
  }

  async getMovementsByProject(projectId, userId) {
    return await Movement.find({ project: projectId, "creator.user": userId });
  }

  async deleteMovements(movementIds, userId) {
    const movements = await Movement.find({
      _id: { $in: movementIds },
      "creator.user": userId,
    });

    if (movements.length === 0) {
      throw new Error("Movements not found");
    }
    const projectUpdates = new Map();

    for (const movement of movements) {
      const projectId = movement.project.toString();
      if (!projectUpdates.has(projectId)) {
        const project = await Project.findById(projectId);
        projectUpdates.set(projectId, {
          sumPrice: project.numbers.sumPrice.number - movement.numbers.sumPrice.number,
          sumBudget: project.numbers.sumBudget.number - movement.numbers.sumBudget.number,
        });
      } else {
        const update = projectUpdates.get(projectId);
        update.sumPrice -= movement.numbers.sumPrice.number;
        update.sumBudget -= movement.numbers.sumBudget.number;
      }
    }
    for (const [projectId, updates] of projectUpdates) {
      const project = await Project.findById(projectId);
      project.numbers = updateNumbers(project.numbers, updates.sumPrice, updates.sumBudget);
      await project.save();
    }

    return await Movement.deleteMany({
      _id: { $in: movementIds },
      "creator.user": userId,
    });
  }
}

module.exports = new MovementService();
