'use strict'

const _ = require('lodash')

module.exports = {

  /**
   * Merge the trailpack's "api" namespace into that of the appliction. This
   * allows Trailpacks to augment the application API (Controllers, Services,
   * Policies, and Models) with their own. This method produces debug logging
   * for any conflicts that occur. It does not merge arrays.
   */
  mergeApplication (app, pack) {
    return _.mergeWith(app.api, pack.api, (appValue, packValue, key, o, s, stack) => {
      const conflicts = _.intersection(_.keys(appValue), _.keys(packValue))
      const packName = _.get(pack, 'pkg.name')

      // return the "default" value; lodash does not have a defaultsWith method
      if (!_.isPlainObject(appValue) && !_.isPlainObject(packValue)) {
        return _.isUndefined(appValue) ? packValue : appValue
      }

      if (conflicts.length > 0) {
        _.each(conflicts, conflictKey => {
          if (_.isPlainObject(appValue[conflictKey])) {
            return
          }
          app.log.debug(`api.${key}.${conflictKey}`, 'is defined by both',
            packName, 'and the application. The', conflictKey,
            'config defined in', packName, 'will be ignored.')
        })
        return _.defaultsDeep(appValue, packValue)
      }

      // explicitly return undefined. this continues the mergeWith traversal
      return
    })
  },

  /**
   * Merge the trailpack's config.env namespace into that of the application.
   */
  mergeEnvironmentConfig (packConfig, envConfig) {
    return _.merge(packConfig, _.get(envConfig, process.env.NODE_ENV))
  },

  /**
   * Merge the trailpack's config into the application configuration, logging
   * conflicts as they are encountered, and unioning arrays.
   */
  mergeApplicationConfig (app, pack) {
    const packConfig = _.omit(pack.config, 'trailpack')
    return _.mergeWith(app.config, packConfig, (appValue, packValue, key, o, s, stack) => {
      const conflicts = _.intersection(_.keys(appValue), _.keys(packValue))
      const packName = _.get(pack, 'pkg.name')

      // union the two arrays, removing primitive duplicates
      if (_.isArray(appValue) && _.isArray(packValue)) {
        return _.union(appValue, packValue)
      }

      // return the "default" value; lodash does not have a defaultsWith method
      if (!_.isPlainObject(appValue) && !_.isPlainObject(packValue)) {
        return _.isUndefined(appValue) ? packValue : appValue
      }

      // if there are conflicts, log debug output
      if (conflicts.length > 0) {
        _.each(conflicts, conflictKey => {
          if (_.isObject(appValue[conflictKey])){
            app.log.debug('The config setting', `${key}.${conflictKey}`, 'is defined by both',
              packName, 'and the application.', `${packName}:${key}.${conflictKey}`,
              'will be merge with application settings.')
          }
          else {
            app.log.silly('The config setting', `${key}.${conflictKey}`, 'is defined by both',
              packName, 'and the application. The', conflictKey,
              'config defined in', packName, 'will be ignored.')
          }
        })
      }

      // explicitly return undefined. this continues the mergeWith traversal
      return
    })
  },

  mergeDefaultTrailpackConfig (packConfig, defaultConfig) {
    return _.defaultsDeep(packConfig || { }, defaultConfig.trailpack)
  }
}

