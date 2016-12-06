'use strict'

const Service = require('trails/service')

/**
 * @module DatastoreService
 * @description Datastore Service
 */
module.exports = class DatastoreService extends Service {

  /**
   * Generic implementation of the SQL "SELECT" statement
   */
  select (modelName, criteria, options) {
    throw new Error('DatastoreService.select must be overridden')
  }

  /**
   * Generic implementation of the SQL "INSERT" statement
   */
  insert (modelName, records, options) {
    throw new Error('DatastoreService.insert must be overridden')
  }

  /**
   * Generic implementation of the SQL "UPDATE" statement
   */
  update (modelName, criteria, values, options) {
    throw new Error('DatastoreService.update must be overridden')
  }

  /**
   * Generic implementation of the SQL "DELETE" statement
   */
  delete (modelName, criteria, options) {
    throw new Error('DatastoreService.delete must be overridden')
  }

  /**
   * Execute arbitrary SQL against
   */
  query (modelName, sql, options) {
    throw new Error('DatastoreService.query must be overridden')
  }
}

