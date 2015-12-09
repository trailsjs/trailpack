/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {

  /**
   * API and config resources provided by this Trailpack.
   */
  provides: {
    api: {
      controllers: [ ]
      // ...
    },
    config: [ ]
  },

  events: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Trailpack
       */
      listen: [ ],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: [ ]
    },
    initialize: {
      listen: [ ],
      emit: [ ]
    }
  }
}
