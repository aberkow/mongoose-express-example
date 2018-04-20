const Project = require('../models/project');
const User = require('../models/user');

module.exports = {
  getAllProjects: async (req, res, next) => {
    try {
      const projects = await Project.find({})
      res.status(200).json(projects);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  addNewProject: async (req, res, next) => {

    try {
      const owner = await User.findById(req.value.body.owner);

      const newProject = req.value.body;
      delete newProject.seller;

      const project = new Project(newProject);
      project.owner = owner;
      await project.save();

      owner.projects.push(project);
      await owner.save();
      res.status(200).json(project);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  getSingleProject: async (req, res, next) => {
    try {
      const project = await Project.findById(req.value.params.projectId);
      res.status(200).json(project);
    } catch (err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  replaceSingleProject: async (req, res, next) => {
    try {
      const { projectId } = req.value.params;
      const newProject = req.value.body;
      const result = await Project.findByIdAndUpdate(projectId, newProject);
      res.status(200).json({ success: "replaced project" })
    } catch (err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  updateSingleProject: async (req, res, next) => {
    try {
      const { projectId } = req.value.params;
      const newProject = req.value.body;
      const result = await Project.findByIdAndUpdate(projectId, newProject);
      res.status(200).json({ sucess: "Project updated" });
    } catch (err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  deleteSingleProject: async (req, res, next) => {
    try {
      const { projectId } = req.value.params;
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ error: "Project doesn't exist" });
      }

      const ownerId = project.owner;
      const owner = await User.findById(ownerId)

      await project.remove();

      owner.projects.pull(project);
      await owner.save();

      res.status(200).json({ success: "Project deleted" });
    } catch (err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  }
}