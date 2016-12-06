'use strict'

const _ = require('lodash')
const Trailpack = require('./')
const footprintOptions = [
  'populate',
  'limit',
  'offset'
]

/**
 * Web Server Trailpack
 *
 * Web Servers should inherit from this Trailpack in order to provide consistent
 * API for all web servers.
 */
module.exports = class ServerTrailpack extends Trailpack {

  /**
   * Extract options from request query and return the object subset.
   */
  getOptionsFromQuery (query) {
    return _.pick(query, footprintOptions)
  }

  /**
   * Extract the criteria from the query
   */
  getCriteriaFromQuery (query) {
    return _.omit(query, footprintOptions)
  }

  constructor (app, config) {
    if (!config) {
      throw new Error('ServerTrailpack must be subclassed. Do not load it directly.')
    }
    super(app, config)
  }

  static get type () {
    return 'server'
  }
}

