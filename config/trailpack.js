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

  lifecycle: {
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
