const ProjectService = require("../services/project.service");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await ProjectService.createProject(name, req.user._id);
    res.status(201).json({ project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getProjects(req.user._id);
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProjects = async (req, res) => {
  try {
    const { ids } = req.body;
    const response = await ProjectService.deleteProjects(ids, req.user._id);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchProjects = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const result = await ProjectService.searchProject(query, req.user._id, page, limit);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
