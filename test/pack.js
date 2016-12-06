'use strict'

const Trailpack = require('../')

module.exports = class TestPack extends Trailpack {
  constructor (app) {
    super(app, {
      pkg: {
        name: 'trailpack-testpack'
      }
    })
  }
}
