'use strict';

/**
 * API Router Module
 * @module src/auth/router
 */

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const Role = require('./roles-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

/** 
 * Post route assigns role
 * @returns {} 200
 */

authRouter.post('/role', (req, res, next) => {
  let role = new Role(req.body);
  
  role.save()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
});

/** 
 * Post route signs up user
 * @returns {} 200
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    })
    .catch(next);
});

/** 
 * Get route signs in user
 */

authRouter.get('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

/** 
 * Get oauth route 
 * @returns {} 200
 */
authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});
/**
 * Post route saves key
 * @returns {} 200
 */

authRouter.post('/key', auth, (req,res,next) => {
  let key = req.user.generateKey();
  res.status(200).send(key);
});

/**
 * Exports authRouter foor use in other files
 * @type {}
 */

module.exports = authRouter;
