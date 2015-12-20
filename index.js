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
   * @constructor
   * @param app TrailsApp instance
   * @param pack.api The api entities defined in this trailpack (api/ folder)
   * @param pack.config The trailpack configuration (config/ folder)
   * @param pack.pkg The trailpack package.json
   *
   * Instantiate the Trailpack and set some initial properties. All Trailpacks
   * should implement their own constructors, and call super(app, pack) with
   * their own pack definitions. Implementing application logic in the trailpack
   * constructor is not recommended.
   */
  constructor (app, pack) {
    if (!pack.pkg) {
      throw new Error('Trailpack is missing package definitition ("pack.pkg")')
    }

    this.app = app
    this.config = _.defaultsDeep(pack.config.trailpack || { }, defaultConfig.trailpack)
    this.pkg = pack.pkg

    _.defaultsDeep(this.app.config, _.omit(pack.config, 'trailpack'))
    _.defaultsDeep(this.app.api, pack.api)
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
   * Validate any necessary preconditions for this trailpack. We strongly
   * recommend that all Trailpacks override this method and use it to check
   * preconditions.
   */
  validate () {

  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   * Trailpacks that require configuration, or need to alter/extend the app's
   * configuration, should override this method.
   */
  configure () {

  }

  /**
   * Start any services or listeners necessary for this pack. Trailpacks that
   * run daemon-like services should override this method.
   */
  initialize () {

  }

  /**
   * Unload this Trailpack. This method will instruct the trailpack to perform
   * any necessary cleanup with the expectation that it will be expunged
   * soon thereafter, or that it is about to be reloaded.
   */
  unload () {

  }

  /**
   * Expunge this Trailpack. This will remove the pack from the application's
   * pack map (app.packs) as well as from the Node module cache
   * (require.cache).
   *
   * This is, for all but the most hackish purposes, irreversible. As such, you
   * should only call this method if you're pretty sure you won't need to
   * reload the module. Calling require() during runtime while requests are
   * being processed is not a good idea. require() is synchronous, and will
   * clog up the event loop. If you want to reload the module again at some
   * point during runtime, call unload() instead.
   *
   */
  expunge () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const result = Util.unloadModule(this.pkg.name, this.app.config.main.paths.root)
        if (result === true) {
          resolve()
          this.app.emit(`trailpack:${this.name}:unloaded`)
        }
        else {
          reject(result)
        }
      })
    })
  }
}

