'use strict'

module.exports = class Trailpack {

  constructor (trails) {
    this.app = trails
  }

  configure () {
    throw new Error('Trailpack.configure() not implemented')
  }

  initialize () {
    throw new Error('Trailpack.initialize() not implemented')
  }

}
