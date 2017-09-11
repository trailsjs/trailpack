'use strict'

const _ = require('lodash')
const Trailpack = require('./')
const footprintOptions = [
  'populate',
  'limit',
  'offset',
  'sort'
]

/**
 * Web Server Trailpack
 *
 * Web Servers should inherit from this Trailpack in order to provide consistent
 * API for all web servers.
 */
module.exports = class ServerTrailpack extends Trailpack {

  _parseQuery(data) {
    return _.mapValues(data, value => {
      if (value === 'true' || value === 'false') {
        value = value === 'true'
      }

      if (value === '%00' || value === 'null') {
        value = null
      }

      const parseValue = parseFloat(value)
      if (!isNaN(parseValue) && isFinite(value)) {
        value = parseValue
      }

      return value
    })
  }

  /**
   * Extract options from request query and return the object subset.
   */
  getOptionsFromQuery(query) {
    return this._parseQuery(_.pick(query, footprintOptions))
  }

  /**
   * Extract the criteria from the query
   */
  getCriteriaFromQuery(query) {
    return this._parseQuery(_.omit(query, footprintOptions))
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

