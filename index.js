'use strict'

const _ = require('lodash')
const path = require('path')

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
  constructor (app, module, config, api) {
    this.module = module
    this.config = config
    this.app = app

    _.defaultsDeep(app.config, _.omit(config, 'trailpack') || { })
    _.defaultsDeep(app.api, api || { })
  }

  /**
   * Return the package definition for this trailpack. Helpful for
   * validating versions and other such package-y things. This getter will
   * dynamically require the package based on the given "module.id". This is
   * one of the few instances of dynamic-require magic in the trails.js
   * famework.
   */
  get pkg () {
    const modulePath = require.resolve(this.module.id)
    try {
      return require(path.resolve(path.dirname(modulePath), 'package'))
    }
    catch (e) {
      this.app.log.warn(e)
      return { }
    }
  }

  /**
   * Return the name of this Trailpack
   * @return String
   */
  get name () {
    return this.config.name || this.constructor.name.toLowerCase()
  }

  /**
   * Validate any necessary preconditions for this trailpack.
   * @return Promise
   */
  validate () {
    return this.app.after(`trailpack:${this.name}:validated`)
  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   * @return Promise
   */
  configure () {
    return this.app.after(`trailpack:${this.name}:configured`)
  }

  /**
   * Start any services or listeners necessary for this pack
   * @return Promise
   */
  initialize () {
    return this.app.after(`trailpack:${this.name}:initialized`)
  }

  /**
   * Unload this Trailpack. This will remove the pack from the application's
   * pack map (app.packs) as well as from the Node module cache
   * (require.cache).
   */
  unload () {
    delete require.cache[require.resolve(this.module.id)]
    return this.app.after(`trailpack:${this.name}:unloaded`)
  }
}
