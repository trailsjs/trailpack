const EventEmitter = require('events').EventEmitter
const defaultsDeep = require('lodash.defaultsdeep')

/**
 * @class Trailpack
 * @see {@link https://trailsjs.io/doc/en/ref/trailpack}
 */
module.exports = class Trailpack {

  /**
   * The Trailpack lifecycle. At each stage (configure, initialize) define
   * preconditions ("listen") and postconditions ("emit") of the trailpack.
   */
  get lifecycle () {
    return {
      configure: {
        listen: [ ],
        emit: [ ]
      },
      initialize: {
        listen: [ ],
        emit: [ ]
      }
    }
  }

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
  constructor (app, { pkg, config = { }, api = { } }) {
    if (!(app instanceof EventEmitter)) {
      throw new Error('The "app" argument must be of type EventEmitter')
    }
    if (!pkg) {
      throw new Error('Trailpack is missing package definition ("pack.pkg")')
    }


    Object.defineProperties(this, {
      app: {
        enumberable: false,
        writable: false,
        value: app
      },
      pkg: {
        value: Object.freeze(pkg),
        writable: false,
        enumerable: false
      },
      api: {
        value: api,
        writable: true
      },
      config: {
        value: config,
        enumerable: false
      }
    })

    defaultsDeep(this.config.lifecycle, this.lifecycle)
    this.app.emit(`trailpack:${this.name}:constructed`, this)
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
  async initialize () {

  }

  /**
   * Unload this Trailpack. This method will instruct the trailpack to perform
   * any necessary cleanup with the expectation that the app will stop or reload
   * soon thereafter. If your trailpack runs a daemon or any other thing that may
   * occupy the event loop, implementing this method is important for Trails to
   * exit correctly.
   */
  async unload () {

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

  get type () {
    return 'misc'
  }
}
