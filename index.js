'use strict'

const _ = require('lodash')
const Util = require('./lib/util')
/**
 * @class Trailpack
 * @see {@link http://trailsjs.io/doc/trailpack}
 */
module.exports = class Trailpack {

  /**
   * @param app TrailsApp instance
   * @param [config] the pack's configuration
   * @param [pack] the pack definition
   */
  constructor (app, pack) {
    this.app = app
    this.config = pack.config || { }
    this.pkg = pack.pkg || { }

    _.defaultsDeep(app.config, _.omit(pack.config, 'trailpack') || { })
    _.defaultsDeep(app.api, pack.api || { })
  }

  /**
   * Return the name of this Trailpack. Returns the name set in the
   * config/trailpack if it exists; otherwise, returns the lowercased name of
   * this here class here.
   *
   * @return String
   */
  get name () {
    return this.pkg.name.replace(/^trailpack\-/, '')
  }

  /**
   * Validate any necessary preconditions for this trailpack.
   * @return Promise
   */
  validate () {

  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   * @return Promise
   */
  configure () {

  }

  /**
   * Start any services or listeners necessary for this pack
   * @return Promise
   */
  initialize () {

  }

  /**
   * Unload this Trailpack. This will remove the pack from the application's
   * pack map (app.packs) as well as from the Node module cache
   * (require.cache).
   */
  unload (resolvedPath) {
    return new Promise((resolve, reject) => {
      const result = Util.unloadModule(resolvedPath || this.pkg.name)
      if (result === true) {
        resolve()
        this.app.emit(`trailpack:${this.name}:unloaded`)
      }
      else {
        reject(result)
      }
    })
  }
}

