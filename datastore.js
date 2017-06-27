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
    Object.entries(this.app.models).forEach(([ modelName, model ]) => {
      const modelConfig = model.constructor.config() || { }
      model.store = modelConfig.store
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

