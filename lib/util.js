const path = require('path')
const _ = require('lodash')

const Util = module.exports = {

  /**
   * Merge the trailpack's "api" namespace into that of the appliction. This
   * allows Trailpacks to augment the application API (Controllers, Services,
   * Policies, and Models) with their own. This method produces debug logging
   * for any conflicts that occur.
   */
  mergeApplication (app, pack) {
    return _.mergeWith(app.api, pack.api, (appValue, packValue, key, o, s, stack) => {
      const conflicts = _.intersection(_.keys(appValue), _.keys(packValue))
      const packName = _.get(pack, 'pkg.name')

      if (conflicts.length > 0) {
        console.log(stack)
        _.each(conflicts, conflictKey => {
          app.log.debug(`api.${key}.${conflictKey}`, 'is defined by both',
            packName, 'and the application. The', conflictKey,
            'defined in', packName, 'will be ignored.')
        })
      }

      return _.defaultsDeep(appValue, packValue)
    })
  },

  /**
   * Merge the trailpack's config.env namespace into that of the application.
   */
  mergeEnvironmentConfig (packConfig, envConfig) {
    return _.merge(packConfig, _.get(envConfig, process.env.NODE_ENV))
  },

  /**
   * Merge the trailpack's config into the application configuration.
   */
  mergeApplicationConfig (app, pack) {
    const packConfig = _.omit(pack.config, 'trailpack')
    return _.mergeWith(app.config, packConfig, (appValue, packValue, key, o, s, stack) => {
      const conflicts = _.intersection(_.keys(appValue), _.keys(packValue))
      const packName = _.get(pack, 'pkg.name')

      if (conflicts.length > 0) {
        console.log(stack)
        _.each(conflicts, conflictKey => {
          app.log.debug('The config setting', `${key}.${conflictKey}`, 'is defined by both',
            packName, 'and the application. The', conflictKey,
            'defined in', packName, 'will be ignored.')
        })
      }

      return _.defaultsDeep(appValue, packValue)
    })
  },

  mergeDefaultTrailpackConfig (packConfig, defaultConfig) {
    return _.defaultsDeep(packConfig || { }, defaultConfig.trailpack)
  },

  /**
   * Expunge a module.
   * Adapted from https://github.com/totherik/freshy/blob/master/index.js#L51-L61
   */
  expungeModule (module, root) {
    try {
      const modulePath = require.resolve(path.resolve(root, 'node_modules', module))

      if (require.cache.hasOwnProperty(modulePath)) {
        require.cache[modulePath].children.forEach(child => {
          Util.expungeModule(child.id)
        })
      }

      return delete require.cache[path];
    }
    catch (e) {
      return e
    }
  }
}
