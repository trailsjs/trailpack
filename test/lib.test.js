'use strict'

const assert = require('assert')
const lib = require('../lib')
const _ = require('lodash')
const smokesignals = require('smokesignals')

describe('lib.util', () => {
  const pack = {
    api: {
      services: {
        TestService: class TestService {
          testMethod () { }
        },
        OverrideService: class OverrideService {
          testMethodOverride () { }
        }
      },
      models: { },
      controllers: { },
      policies: { }
    }
  }
  describe('#mergeApplication', () => {
    let appA, appB
    beforeEach(() => {
      appA = {
        api: {
          services: {
            ExtantService: class ExtantService {
              testMethod () { }
            }
          },
          models: { },
          controllers: { },
          policies: { }
        },
        log: new smokesignals.Logger('debug')
      }
      appB = {
        api: {
          services: {
            OverrideService: class OverrideService {
              testMethod () { }
            }
          },
          models: { },
          controllers: { },
          policies: { }
        },
        log: new smokesignals.Logger('debug')
      }
    })

    it('should correctly merge Service classes into the api.services namespace', () => {
      const mergedApi = lib.Util.mergeApplication(appA, pack)
      assert(_.isFunction(mergedApi.services.TestService))
    })

    it('should not clobber any existing services in api.services namespace', () => {
      const mergedApi = lib.Util.mergeApplication(appA, pack)
      assert(_.isFunction(mergedApi.services.ExtantService))
      assert(_.isFunction(mergedApi.services.TestService))
      assert(_.isFunction(mergedApi.services.OverrideService))
    })

    it('should not override extant Service class if there is naming conflict', () => {
      const mergedApi = lib.Util.mergeApplication(appB, pack)
      assert(_.isFunction(mergedApi.services.OverrideService))
      assert(!mergedApi.services.OverrideService.prototype.testMethodOverride)
      assert(mergedApi.services.OverrideService.prototype.testMethod)
    })

  })
})

