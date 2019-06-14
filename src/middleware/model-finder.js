'use strict';

/**
 * @module model-finder
 * 
 */
 
/**
 * This finds the model that acts as the interface
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - goes to next piece of middleware
 * @descr
 */

module.exports = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  req.model = require(`../models/${modelName}/${modelName}-model.js`);
  next();
};
