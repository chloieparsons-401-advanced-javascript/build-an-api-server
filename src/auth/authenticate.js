'use strict';

/**
 * API Server Module
 * @module src/auth/authenticate
 */

const _authError = require('../authError.js');

/**
 * @module _authenticate
 * @param {@} str 
 * @description handles authentication info
 */

function _authenticate(user, capability) {
  if ( user && (!capability || (user.can(capability))) ) {
    req.user = user;
    req.token = user.generateToken();
    next();
  }
  else {
    _authError();
  }
}


/**
 * Exports authenticate to other files
 * @type {}
 */

module.exports = _authenticate;