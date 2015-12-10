/**
 * Default Trailpack Configuration
 */
module.exports = {
  provides: {
    api: {
      controllers: [ ],
      policies: [ ],
      services: [ ],
      models: [ ]
    },
    config: [ ]
  },

  events: {
    configure: {
      listen: [ ],
      emit: [ ]
    },
    initialize: {
      listen: [ ],
      emit: [ ]
    }
  }
}
