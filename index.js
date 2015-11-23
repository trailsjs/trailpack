'use strict'

module.exports = class Trailpack {

  constructor (app) {
    this.app = app
  }

  getName () {
    throw new Error('Trailpack.getName() not implemented')
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
