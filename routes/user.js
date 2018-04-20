const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(UsersController.getAllUsers)
  .post(validateBody(schemas.userSchema), UsersController.addNewUser);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.getSingleUser)
  .put(
    [validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)],
    UsersController.replaceSingleUser
  )
  .patch(
    [validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)],
    UsersController.updateSingleUser
  )
  .delete(validateParam(schemas.idSchema, 'userId'), UsersController.deleteSingleUser);

router.route('/:userId/projects')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserProjects)
  .post(
    [validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userProjectSchema)],
    UsersController.addNewUserProject
  )

module.exports = router;