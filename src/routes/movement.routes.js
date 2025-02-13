const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movement.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/", movementController.createMovement);
router.get("/project/:projectId", movementController.getMovementsByProject);
router.delete("/", movementController.deleteMovements);

module.exports = router;
