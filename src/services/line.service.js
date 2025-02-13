const Line = require("../models/line.model");
const Movement = require("../models/movement.model");
const Project = require("../models/project.model");
const { updateNumbers } = require("../utils/calculations.util");

class LineService {
  async createLine(name, movementId, userId) {
    const movement = await Movement.findOne({
      _id: movementId,
      "creator.user": userId,
    });

    if (!movement) {
      throw new Error("Movement not found");
    }
    return await Line.create({
      name,
      movement: movementId,
      creator: { user: userId },
    });
  }

  async getLinesByMovement(movementId, userId) {
    const lines = await Line.find({
      movement: movementId,
      "creator.user": userId,
    });

    return lines;
  }

  async deleteLines(lineIds, userId) {
    const lines = await Line.find({
      _id: { $in: lineIds },
      "creator.user": userId,
    });

    if (lines.length === 0) {
      throw new Error("Lines not found");
    }

    const movementUpdates = new Map();
    const projectUpdates = new Map();

    for (const line of lines) {
      const movement = await Movement.findById(line.movement);
      const projectId = movement.project.toString();

      if (!movementUpdates.has(movement._id.toString())) {
        movementUpdates.set(movement._id.toString(), {
          sumPrice: movement.numbers.sumPrice.number - line.numbers.sumPrice.number,
          sumBudget: movement.numbers.sumBudget.number - line.numbers.sumBudget.number,
        });
      } else {
        const update = movementUpdates.get(movement._id.toString());
        update.sumPrice -= line.numbers.sumPrice.number;
        update.sumBudget -= line.numbers.sumBudget.number;
      }

      if (!projectUpdates.has(projectId)) {
        const project = await Project.findById(projectId);
        projectUpdates.set(projectId, {
          sumPrice: project.numbers.sumPrice.number - line.numbers.sumPrice.number,
          sumBudget: project.numbers.sumBudget.number - line.numbers.sumBudget.number,
        });
      } else {
        const update = projectUpdates.get(projectId);
        update.sumPrice -= line.numbers.sumPrice.number;
        update.sumBudget -= line.numbers.sumBudget.number;
      }
    }

    for (const [movementId, updates] of movementUpdates) {
      const movement = await Movement.findById(movementId);
      movement.numbers = updateNumbers(movement.numbers, updates.sumPrice, updates.sumBudget);
      await movement.save();
    }

    for (const [projectId, updates] of projectUpdates) {
      const project = await Project.findById(projectId);
      project.numbers = updateNumbers(project.numbers, updates.sumPrice, updates.sumBudget);
      await project.save();
    }

    return await Line.deleteMany({
      _id: { $in: lineIds },
      "creator.user": userId,
    });
  }

  async updateLineNumbers(lineId, sumPrice, sumBudget, userId) {
    const line = await Line.findOne({
      _id: lineId,
      "creator.user": userId,
    });

    if (!line) {
      throw new Error("Line not found");
    }

    const oldSumPrice = line.numbers.sumPrice.number;
    const oldSumBudget = line.numbers.sumBudget.number;
    line.numbers = updateNumbers(line.numbers, sumPrice, sumBudget);
    await line.save();

    const movement = await Movement.findById(line.movement);
    const newMovementSumPrice = movement.numbers.sumPrice.number - oldSumPrice + sumPrice;
    const newMovementSumBudget = movement.numbers.sumBudget.number - oldSumBudget + sumBudget;
    movement.numbers = updateNumbers(movement.numbers, newMovementSumPrice, newMovementSumBudget);
    await movement.save();

    const project = await Project.findById(movement.project);
    const newProjectSumPrice = project.numbers.sumPrice.number - oldSumPrice + sumPrice;
    const newProjectSumBudget = project.numbers.sumBudget.number - oldSumBudget + sumBudget;
    project.numbers = updateNumbers(project.numbers, newProjectSumPrice, newProjectSumBudget);
    await project.save();

    return { line, movement, project };
  }
}

module.exports = new LineService();
