const path = require('path')
const _ = require('lodash')

const Util = module.exports = {

  /**
   * Merge the trailpack's "api" namespace into that of the appliction. This
   * allows Trailpacks to augment the application API (Controllers, Services,
   * Policies, and Models) with their own.
   */
  mergeApplication (appApi, packApi) {
    return _.merge(appApi, packApi)
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
  mergeApplicationConfig (appConfig, packConfig) {
    return _.defaultsDeep(appConfig, _.omit(packConfig, 'trailpack'))
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
