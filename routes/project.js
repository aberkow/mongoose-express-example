const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/project');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(ProjectsController.getAllProjects)
  .post(validateBody(schemas.projectSchema), ProjectsController.addNewProject)

router.route('/:projectId')
  .get(validateParam(schemas.idSchema, 'projectId'),
    ProjectsController.getSingleProject
  )
  .put([
    validateParam(schemas.idSchema, 'projectId'),
    validateBody(schemas.putProjectSchema)
  ],
    ProjectsController.replaceSingleProject
  )
  .patch([
    validateParam(schemas.idSchema, 'projectId'),
    validateBody(schemas.patchProjectSchema)
  ],
    ProjectsController.updateSingleProject
  )
  .delete(validateParam(schemas.idSchema, 'projectId'), ProjectsController.deleteSingleProject)


module.exports = router;