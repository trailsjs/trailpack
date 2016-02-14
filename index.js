'use strict'

const events = require('events')
const lib = require('./lib')
const defaultConfig = require('./config')

/**
 * @class Trailpack
 * @see {@link http://trailsjs.io/doc/trailpack}
 */
module.exports = class Trailpack extends events.EventEmitter {

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
    super()

    if (!pack.pkg) {
      throw new Error('Trailpack is missing package definition ("pack.pkg")')
    }
    if (!pack.config) {
      pack.config = { }
    }

    Object.defineProperty(this, 'app', {
      enumberable: false,
      value: app
    })

    this.pkg = pack.pkg
    this.config = lib.Util.mergeDefaultTrailpackConfig(pack.config.trailpack, defaultConfig)

    lib.Util.mergeEnvironmentConfig(pack.config, pack.config.env)
    lib.Util.mergeApplication(this.app, pack)
    lib.Util.mergeApplicationConfig(this.app, pack)

    this.app.emit(`trailpack:${this.name}:constructed`)
  }

  /**
   * Validate any necessary preconditions for this trailpack. We strongly
   * recommend that all Trailpacks override this method and use it to check
   * preconditions.
   */
  validate () {
    return Promise.resolve()
  }

  /**
   * Set any configuration required before the trailpacks are initialized.
   * Trailpacks that require configuration, or need to alter/extend the app's
   * configuration, should override this method.
   */
  configure () {
    return Promise.resolve()
  }

  /**
   * Start any services or listeners necessary for this pack. Trailpacks that
   * run daemon-like services should override this method.
   */
  initialize () {
    return Promise.resolve()
  }

  /**
   * Unload this Trailpack. This method will instruct the trailpack to perform
   * any necessary cleanup with the expectation that it will be expunged
   * soon thereafter, or that it is about to be reloaded.
   */
  unload () {
    return Promise.resolve()
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
        const result = lib.Util.expungeModule(this.pkg.name, this.app.config.main.paths.root)
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

  emit () {
    return this.app.emit.apply(this.app, arguments)
  }

  /**
   * Expose the application's logger directly on the Trailpack for convenience.
   */
  get log () {
    return this.app.log
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

}

