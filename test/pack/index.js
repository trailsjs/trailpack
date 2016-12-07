'use strict'

const Trailpack = require('../../')

module.exports = class TestPack extends Trailpack {
  constructor (app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}
