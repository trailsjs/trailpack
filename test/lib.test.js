'use strict'

const assert = require('assert')
const lib = require('../lib')
const _ = require('lodash')

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
      }
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
        }
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
        }
      }
    })

    it('should correctly merge Service classes into the api.services namespace', () => {
      const mergedApp = lib.Util.mergeApplication(appA, pack)
      assert(_.isFunction(mergedApp.api.services.TestService))
    })

    it('should not clobber any existing services in api.services namespace', () => {
      const mergedApp = lib.Util.mergeApplication(appA, pack)
      assert(_.isFunction(mergedApp.api.services.ExtantService))
    })

    it('should override extant Service class if there is naming conflict', () => {
      const mergedApp = lib.Util.mergeApplication(appB, pack)
      assert(_.isFunction(mergedApp.api.services.OverrideService))
      assert(mergedApp.api.services.OverrideService.prototype.testMethodOverride)
      assert(!mergedApp.api.services.OverrideService.prototype.testMethod)
    })

  })
})

