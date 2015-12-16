'use strict'

const _ = require('lodash')
const Util = require('./lib/util')
const defaultConfig = require('./config')

/**
 * @class Trailpack
 * @see {@link http://trailsjs.io/doc/trailpack}
 */
module.exports = class Trailpack {

  /**
   * @param app TrailsApp instance
   * @param pack.api The api entities defined in this trailpack (api/ folder)
   * @param pack.config The trailpack configuration (config/ folder)
   * @param pack.pkg The trailpack package.json
   */
  constructor (app, pack) {
    if (!pack.pkg) {
      throw new Error('Trailpack is missing package definitition ("app.pkg")')
    }

    this.app = app
    this.config = _.defaultsDeep(pack.config.trailpack || { }, defaultConfig.trailpack)
    this.pkg = pack.pkg

    _.defaultsDeep(app.config, _.omit(pack.config, 'trailpack'))
    _.defaultsDeep(app.api, pack.api)
  }

  /**
   * Return the name of this Trailpack. By default, this is the name of the
   * npm module (in package.json). This method can be overridden for trailpacks
   * which do not follow the "trailpack-" prefix naming convention.
   *
   * @return String
   */
  get name () {
    return this.pkg.name.replace(/trailpack\-/, '')
  }

  /**
   * Validate any necessary preconditions for this trailpack.
   */
  validate () {

  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   */
  configure () {

  }

  /**
   * Start any services or listeners necessary for this pack
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

