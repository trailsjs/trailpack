'use strict'

module.exports = class Trailpack {

  constructor (app) {
    this.app = app
  }

  validate () {

  }

  configure () {
    throw new Error('Trailpack.configure() not implemented')
  }

  initialize () {
    throw new Error('Trailpack.initialize() not implemented')
  }

}
