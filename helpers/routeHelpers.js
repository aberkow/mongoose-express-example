// joi is a validator

const joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = joi.validate({ param: req['params'][name] }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value['params']) {
          req.value['params'] = {};
        }
        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {}
        }
        if (!req.value['body']) {
          req.value['body'] = {}
        }
        req.value['body'] = result.value;
        next();
      }
    }
  },
  schemas: {
    userSchema: joi.object().keys({
      name: joi.string().required(),
      age: joi.string().required()
    }),
    userOptionalSchema: joi.object().keys({
      name: joi.string(),
      age: joi.string()
    }),
    userProjectSchema: joi.object().keys({
      title: joi.string().required(),
      description: joi.string().required()
    }),
    projectOptionalSchema: joi.object().keys({
      title: joi.string(),
      description: joi.string()
    }),
    projectSchema: joi.object().keys({
      title: joi.string().required(),
      description: joi.string().required(),
      owner: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    putProjectSchema: joi.object().keys({
      title: joi.string().required(),
      description: joi.string().required()
    }),
    patchProjectSchema: joi.object().keys({
      title: joi.string(),
      description: joi.string()
    }),
    idSchema: joi.object().keys({
      param: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
}