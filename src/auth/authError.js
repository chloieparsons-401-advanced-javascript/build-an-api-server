'use strict';

/**
 * Authentication Module
 * @module src/auth/authError
 */

/**
 * @param {@} User 
 * @description handles authentication errors
 */

function _authError() {
  return (next) => {
      next('Invalid User ID/Password');
  };
}


/**
 * Exports authError to other files
 * @type {}
 */

module.exports = _authError;