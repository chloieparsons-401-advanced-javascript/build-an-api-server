'use strict';

const uuid = require('uuid/v4');

/**
 * @Class Memory Model 
 * @desc 
 */
class Model {

  /**
   * Model constructor takes in schema
   * @param {players/teams} schema 
   */

  constructor(schema) {
    this.schema = schema;
    this.database = [];
  }

  /**
   * Sanitize entry
   * @method sanitize
   * @param {object} entry 
   * 
   * Sanitized entry
   * @desc
   */
  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach( field => {
      if ( this.schema[field].required ) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });
    
    return valid ? record : undefined;
  }
  
  /**
   * @method count
   * @desc Keep count of database
   */
  count() {
    return this.database.length;
  }

  /**
   * Gets a record based on ID
   * Then returns record's data
   * @method get
   * @param {integer} _id 
   * @desc
   */
  get(id) {
    const records = id ? this.database.filter( (record) => record._id === id ) : this.database;
    return Promise.resolve(records);
  }

  /**
   * Posts a new record
   * @method post
   * @param {*} record
   * @desc
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if ( record._id ) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Deletes record based on ID
   * @method delete
   * @param {integer} _id 
   * 
   * Deletes record
   * @desc
   */
  delete(id) {
    this.database = this.database.filter((record) => record._id !== id );
    return this.get(id);
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
  put(id, entry) {
    let record = this.sanitize(entry);
    if( record._id ) { this.database = this.database.map((item) => (item._id === id) ? record : item  ); }
    return this.get(id);
  }
  
}

module.exports = Model;