'use strict'

const lib = require('./lib')
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
      throw new Error('Trailpack is missing package definition ("pack.pkg")')
    }
    if (!pack.config) {
      pack.config = { }
    }

    Object.defineProperties(this, {
      app: {
        enumberable: false,
        value: app
      },
      pkg: {
        value: Object.freeze(pack.pkg),
        enumerable: false
      },
      config: {
        value: lib.Util.mergeDefaultTrailpackConfig(pack.config.trailpack, defaultConfig),
        enumerable: false
      }
    })

    lib.Util.mergeEnvironmentConfig(pack.config, pack.config.env)
    lib.Util.mergeApplication(this.app, pack)
    lib.Util.mergeApplicationConfig(this.app, pack)

    this.app.packs[this.name] = this
    this.emit(`trailpack:${this.name}:constructed`)
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
   * any necessary cleanup with the expectation that the app will stop or reload
   * soon thereafter.
   */
  unload () {

  }

  emit () {
    return this.app.emit.apply(this.app, arguments)
  }

  once () {
    return this.app.once.apply(this.app, arguments)
  }

  on () {
    return this.app.once.apply(this.app, arguments)
  }

  after () {
    return this.app.after.apply(this.app, arguments)
  }

  /**
   * Expose the application's logger directly on the Trailpack for convenience.
   */
  get log () {
    return this.app.log
  }

  /**
   * Expose the application's packs directly on the Trailpack for convenience.
   */
  get packs () {
    return this.app.packs
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

