const Trailpack = require('trailpack')

module.exports = class Archetype extends Trailpack {

  static get lifecycle () {
    return { }
  }

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * TODO document method
   */
  async initialize () {

  }

  /**
   * TODO document method
   */
  async unload () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

