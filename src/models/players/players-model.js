'use strict';

const Model = require('../mongo-model.js');
const schema = require('./players-schema.js');

/**
 * @Class Players Model 
 * @desc 
 */
class Players extends Model {}

module.exports = new Players(schema);

