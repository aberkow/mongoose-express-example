const User = require('../models/user');
const Project = require('../models/project');
const Joi = require('joi');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  addNewUser: async (req, res, next) => {
    try {
      const newUser = new User(req.value.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  getSingleUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  replaceSingleUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const newUser = req.value.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ sucess: "User replaced" });
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  updateSingleUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const newUser = req.value.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ sucess: "User updated" });
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  deleteSingleUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const result = await User.findByIdAndRemove(userId);
      res.status(200).json({ success: "User delted" });
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  getUserProjects: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const { projects } = await User.findById(userId).populate('projects');
      console.log(projects)
      res.status(200).json(projects);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  },
  addNewUserProject: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const newProject = new Project(req.value.body);
      const user = await User.findById(userId);
      newProject.owner = user;
      await newProject.save();
      user.projects.push(newProject);
      await user.save();
      res.status(201).json(newProject);
    } catch(err) {
      console.log(`Err -> ${err}`);
      next(err);
    }
  }
}