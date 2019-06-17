'use strict';

const User = require('./users-model.js');

module.exports = (capability) => {
  
  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
        case 'basic':
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default:
          return _authError();
      }
    } catch (e) {
      _authError();
    }


    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }
  
    function _authenticate(user) {
      if ( user && (!capability || (user.can(capability))) ) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next('Invalid User ID/Password');
    }

  };
  
};