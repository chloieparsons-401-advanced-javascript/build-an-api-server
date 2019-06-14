'use strict';

/**
 * @module 404-Error
 */

/**
 *  Handles 404 Error Response
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - goes to next piece of middleware
 * @descr
 */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
