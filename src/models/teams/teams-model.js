'use strict';

const Model = require('../mongo-model.js');
const schema = require('./teams-schema.js');

/**
 * @Class Teams Model
 * @descr
 */

class Teams extends Model {}

module.exports = new Teams(schema);

