const express = require("express");
const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.delete("/", projectController.deleteProjects);
router.get("/search", projectController.searchProjects);

module.exports = router;
