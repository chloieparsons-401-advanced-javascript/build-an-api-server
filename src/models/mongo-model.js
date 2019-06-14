'use strict';

/**
 * @Class Mongo Model 
 * @desc extends to players & team models using Mongo
 */
class Model {

  /**
   * Model constructor takes in schema
   * @param {players/teams} schema 
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Gets a record based on ID
   * Then returns record's data
   * @method get
   * @param {integer} _id 
   * @desc
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  /**
   * Posts a new record
   * @method post
   * @param {*} record
   * @desc
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * Updates a record based on its id
   * @method put
   * @param {integer} _id 
   * @param {string} record 
   * 
   * Updates record data
   * @desc
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   * Deletes record based on ID
   * @method delete
   * @param {integer} _id 
   * 
   * Deletes record
   * @desc
   */

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
