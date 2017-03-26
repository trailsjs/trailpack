'use strict'

const defaultsDeep = require('lodash.defaultsdeep')
const mergeWith = require('lodash.mergewith')
const intersection = require('lodash.intersection')
const isArray = require('lodash.isarray')
const isObject = require('lodash.isobject')
const isPlainObject = require('lodash.isplainobject')
const isUndefined = require('lodash.isundefined')
const union = require('lodash.union')

module.exports = {

  /**
   * Merge the trailpack's "api" namespace into that of the appliction. This
   * allows Trailpacks to augment the application API (Controllers, Services,
   * Policies, and Models) with their own. This method produces debug logging
   * for any conflicts that occur. It does not merge arrays.
   */
  mergeApplication (app, pack) {
    return mergeWith(app.api, pack.api, (appValue = { }, packValue = { }, key) => {
      const conflicts = intersection(Object.keys(appValue), Object.keys(packValue))
      const packName = pack.pkg.name

      // return the "default" value; lodash does not have a defaultsWith method
      if (!isPlainObject(appValue) && !isPlainObject(packValue)) {
        return isUndefined(appValue) ? packValue : appValue
      }

      if (conflicts.length > 0) {
        conflicts.forEach(conflictKey => {
          if (isPlainObject(appValue[conflictKey])) {
            return
          }
          app.log.debug(`api.${key}.${conflictKey}`, 'is defined by both',
            packName, 'and the application. The', conflictKey,
            'config defined in', packName, 'will be ignored.')
        })
        return defaultsDeep(appValue, packValue)
      }

      // explicitly return undefined. this continues the mergeWith traversal
      return
    })
  },

  /**
   * Merge the trailpack's config into the application configuration, logging
   * conflicts as they are encountered, and unioning arrays.
   */
  mergeApplicationConfig (app, pack) {
    const packConfig = pack.config
    return mergeWith(app.config, packConfig, (appValue = { }, packValue = { }, key) => {
      const conflicts = intersection(Object.keys(appValue), Object.keys(packValue))
      const packName = pack.pkg.name

      // union the two arrays, removing primitive duplicates
      if (isArray(appValue) && isArray(packValue)) {
        return union(appValue, packValue)
      }

      // return the "default" value; lodash does not have a defaultsWith method
      if (!isPlainObject(appValue) && !isPlainObject(packValue)) {
        return isUndefined(appValue) ? packValue : appValue
      }

      // if there are conflicts, log debug output
      if (conflicts.length > 0) {
        conflicts.forEach(conflictKey => {
          if (isObject(appValue[conflictKey])){
            app.log.debug('The config setting', `${key}.${conflictKey}`, 'is defined by both',
              packName, 'and the application.', `${packName}:${key}.${conflictKey}`,
              'will be merged with application settings.')
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
    return defaultsDeep(packConfig || { }, defaultConfig.trailpack)
  }
}

