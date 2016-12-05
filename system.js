'use strict'

const Trailpack = require('./')

module.exports = class SystemTrailpack extends Trailpack {

  static get type () {
    return 'system'
  }
}
