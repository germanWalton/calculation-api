const express = require("express");
const lineController = require("../controllers/line.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", lineController.createLine);
router.get("/:movementId", lineController.getLinesByMovement);
router.delete("/", lineController.deleteLines);
router.patch("/:lineId/numbers", lineController.updateLineNumbers);

module.exports = router;
