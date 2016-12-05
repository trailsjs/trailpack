'use strict'

const Trailpack = require('./')

module.exports = class AbstractTrailpack extends Trailpack {

  static get type () {
    return 'extension'
  }
}
