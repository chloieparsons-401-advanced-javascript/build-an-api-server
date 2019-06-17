'use strict';

/**
 * API Server Module
 * @module src/auth/authBearer
 */

const User = require('./users-model.js');
const _authenticate = require ('../authenticate.js');
const _authError = require('../authError.js');

/**
 * @module _authBearer
 * @param {@} str 
 * @description handles authentication info
 */

function _authBearer(authString, capability) {
  return User.authenticateToken(authString)
    .then(user => _authenticate(user, capability))
    .catch(_authError);
}

/**
 * Exports authBearer to other files
 * @type {}
 */

module.exports = _authBearer;