const Project = require("../models/project.model");

class ProjectService {
  async createProject(name, userId) {
    return await Project.create({
      name,
      creator: { user: userId },
    });
  }

  async getProjects(userId) {
    return await Project.find({ "creator.user": userId });
  }

  async deleteProjects(ids, userId) {
    return await Project.deleteMany({ _id: { $in: ids }, "creator.user": userId });
  }

  async searchProject(query, userId, page = 1, limit = 10) {
    const projects = await Project.find(
      {
        $text: { $search: query },
        "creator.user": userId,
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Project.countDocuments({
      $text: { $search: query },
      "creator.user": userId,
    });

    return {
      projects,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}

module.exports = new ProjectService();
