'use strict'

const Trailpack = require('../')

module.exports = class TestPack extends Trailpack {

  constructor () {
    super({ }, module, { }, { })
  }
}
