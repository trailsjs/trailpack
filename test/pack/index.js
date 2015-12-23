'use strict'

const app = {
  config: require('./config')
}
const Trailpack = require('../../')

module.exports = class TestPack extends Trailpack {

  constructor () {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }
}
