/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  provides: { },
  events: {
    configure: {
      listen: [
        'trailpack:all:validated'
      ]
    },
    initialize: {
      listen: [
        'trailpack:all:configured'
      ]
    }
  }
}
