'use strict'

const _ = require('lodash')
const joi = require('joi')
const util = require('./util')

module.exports = class Trailpack {

  constructor (app, config) {
    this.app = app
    this.config = config

    _.defaultsDeep(this.app.config, this.config)
  }

  /**
   * Return name of this trailpack
   */
  get name () {
    return this.config.trailpack.name
  }

  /**
   * Return the configuration of this trailpack. If you're writing a trailpack,
   * utilize this.config intentionally. This object is merged with app.config,
   * so don't shove random crap in there.
   */
  get config () {
    return this.config
  }

  /**
   * Test the sanity of this trailpack.
   * @return Promise
   */
  test () {
    return new Promise((resolve, reject) => {
      joi.validate(this.config, util.trailpackSchema, (err, value) => {
        if (err) return reject(err)

        return resolve(value)
      })
    })
  },

  /**
   * Validate any necessary preconditions for this trailpack. 
   * @return Promise
   */
  validate () {
    return this.app.after('trailpack:core:validated')
  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   */
  configure () {
    return this.app.after('trailpack:core:configured')
  }

  /**
   * Start any services or listeners necessary for this pack
   */
  initialize () {
    return this.app.after('trailpack:core:initialized')
  }
}
