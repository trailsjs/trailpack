'use strict'

module.exports = class Trailpack {

  constructor (app) {
    this.app = app
  }

  getName () {
    return Promise.reject('Trailpack.getName() not implemented')
  }

  validate () {
    return Promise.resolve()
  }

  configure () {
    return Promise.resolve()
  }

  initialize () {
    return Promise.resolve()
  }

}
