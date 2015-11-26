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

module.exports = {

  trailpackSchema: joi.object().keys({
    name: joi.string().required(),
    provides: declarationSchema,
    modifies: declarationSchema
  })
}
