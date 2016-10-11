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
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack is missing package configuration ("pack.config")')
    }
    if (!pack.config.trailpack) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack is missing configuration ("pack.config.trailpack")')
    }
    if (!pack.config.trailpack.lifecycle
        || typeof pack.config.trailpack.lifecycle !== 'object' ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle configuration should be an object ' +
          '("pack.config.trailpack.lifecycle")')
    }
    if (!pack.config.trailpack.lifecycle.configure
        || typeof pack.config.trailpack.lifecycle.configure !== 'object' ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle configuration should be an object ' +
          '("pack.config.trailpack.lifecycle.configure")')
    }
    if (!pack.config.trailpack.lifecycle.configure.listen
        || !Array.isArray(pack.config.trailpack.lifecycle.configure.listen) ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle configuration listeners should be an array ' +
          '("pack.config.trailpack.lifecycle.configure.listen")')
    }
    if (!pack.config.trailpack.lifecycle.configure.emit
        || !Array.isArray(pack.config.trailpack.lifecycle.configure.emit)) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle configuration emitters should be an array ' +
          '("pack.config.trailpack.lifecycle.configure.emit")')
    }
    if (!pack.config.trailpack.lifecycle.initialize
        || typeof pack.config.trailpack.lifecycle.initialize !== 'object' ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle initialize should be an object ' +
          '("pack.config.trailpack.lifecycle.initialize")')
    }
    if (!pack.config.trailpack.lifecycle.initialize.listen
        || !Array.isArray(pack.config.trailpack.lifecycle.initialize.listen) ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle initialize listeners should be an array ' +
          '("pack.config.trailpack.lifecycle.initialize.listen")')
    }
    if (!pack.config.trailpack.lifecycle.initialize.emit
        || !Array.isArray(pack.config.trailpack.lifecycle.initialize.emit) ) {
      throw new Error('[' + pack.pkg.name + '] ' +
          'Trailpack lifecycle initialize emitters should be an array ' +
          '("pack.config.trailpack.lifecycle.initialize.emit")')
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

    lib.Util.mergeApplicationTrailpackConfig(this.app, pack)
    lib.Util.mergeApplication(this.app, pack)
    lib.Util.mergeApplicationConfig(this.app, pack)
    lib.Util.mergeEnvironmentConfig(pack.config, this.app.config)

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

