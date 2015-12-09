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

const Util = module.exports = {

  /**
   * Unload a module.
   * Adapted from https://github.com/totherik/freshy/blob/master/index.js#L51-L61
   */
  unloadModule (module) {
    try {
      const path = require.resolve(module);

      if (require.cache.hasOwnProperty(path)) {
        require.cache[path].children.forEach(child => {
          Util.unloadModule(child.id)
        })
      }

      return delete require.cache[path];
    }
    catch (e) {
      return e
    }
  },

  /*
  trailpackSchema: joi.object().keys({
  }),
  */


}
