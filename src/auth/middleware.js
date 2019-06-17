'use strict';

/**
 * Middleware Module
 * @module src/auth/middleware
 */

/**
 * @param {} req
 * @param {} res
 * @description Contains all middleware
 */

module.exports = (capability) => {
  
  return (req, res, next) => {
    const _authBasic = require('../auth/authModule/authBasic');
    const _authBearer = require('./authBearer');
    const _authError = require('./authError');

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString, capability);
      case 'bearer':
        return _authBearer(authString, capability);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }
  };
};