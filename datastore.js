'use strict'

const _ = require('lodash')
const Trailpack = require('./')

/**
 * Datastore Trailpack
 *
 * Datastores should inherit from this Trailpack in order to provide consistent
 * API for all datastores.
 */
module.exports = class DatastoreTrailpack extends Trailpack {

  /**
   * Map stores to models.
   */
  initialize () {
    const config = this.app.config

    _.each(this.app.models, model => {
      const modelConfig = model.constructor.config() || { }
      const store = modelConfig.store || config.database.models.defaultStore

      model.store = store
    })
  }

  constructor (app, config) {
    if (!config) {
      throw new Error('DatastoreTrailpack must be subclassed. Do not load it directly.')
    }
    super(app, config)
  }

  static get type () {
    return 'datastore'
  }
}

