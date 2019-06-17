'use strict';

/**
 * API Server Module
 * @module src/auth/authModule/authBasic
 */

const User = require('./users-model.js');
const _authenticate = require ('../authenticate.js');
const _authError = require('../authError.js');

/**
 * @module _authBasic
 * @param {@} str 
 * @description handles authentication info
 */
function _authBasic(str, capability) {
  let base64Buffer = Buffer.from(str, 'base64'); 
  let bufferString = base64Buffer.toString();
  let [username, password] = bufferString.split(':'); 
  let auth = {username, password};

  return User.authenticateBasic(auth)
    .then(user => _authenticate(user, capability))
    .catch(_authError);
}

/**
 * Exports authBasic to other files
 * @type {}
 */
module.exports = _authBasic;