'use strict';

/**
 * @module 500-Error
 */

/**
 * Handles 500-Error (Server Error)
 * @param {object} err - err object
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {object} next - goes to next piece of middleware
 * @descr
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};
