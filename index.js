'use strict'

const _ = require('lodash')

/**
 * @class Trailpack 
 * @see {@link http://trailsjs.io/doc/trailpack}
 */
module.exports = class Trailpack {

  /**
   * @param app TrailsApp instance
   * @param config
   * @param [api]
   */
  constructor (app, config, api) {
    _.extend(this, config.trailpack)

    delete config.trailpack
    _.defaultsDeep(app.config, config || { })
    _.defaultsDeep(app.api, api || { })

    this.app = app
    this.config = app.config
  }

  /**
   * Return the name of this Trailpack
   * @return String
   */
  get name () {
    return this.constructor.name.toLowerCase()
  }

  /**
   * Validate any necessary preconditions for this trailpack. 
   * @return Promise
   */
  validate () {
    return this.app.after('trailpack:core:validated')
  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   * @return Promise
   */
  configure () {
    return this.app.after('trailpack:core:configured')
  }

  /**
   * Start any services or listeners necessary for this pack
   * @return Promise
   */
  initialize () {
    return this.app.after('trailpack:core:initialized')
  }
}
