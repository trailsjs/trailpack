const path = require('path')
const _ = require('lodash')
/*
const joi = require('joi')

const declarationSchema = joi.object().keys({
  app: joi.alternatives().try(
    joi.boolean().valid(false),
    joi.array().items(joi.string())
  ),
  controllers: joi.alternatives().try(
    joi.boolean().valid(false),
    joi.array().items(joi.string())
  ),
  config: joi.alternatives().try(
    joi.boolean().valid(false),
    joi.array().items(joi.string())
  ),
  models: joi.alternatives().try(
    joi.boolean().valid(false),
    joi.array().items(joi.string())
  ),
  policies: joi.alternatives().try(
    joi.boolean().valid(false),
    joi.array().items(joi.string())
  )
})
*/

const Util = module.exports = {

  mergeApplication (appApi, packApi) {
    return _.defaultsDeep(appApi, packApi)
  },

  mergeEnvironmentConfig (packConfig, envConfig) {
    return _.merge(packConfig, _.get(envConfig, process.env.NODE_ENV))
  },

  /**
   * Merge the trailpack's config into the application configuration.
   */
  mergeApplicationConfig (appConfig, packConfig) {
    return _.merge(appConfig, _.omit(packConfig, 'trailpack'))
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

  /*
  trailpackSchema: joi.object().keys({
  }),
  */


}
