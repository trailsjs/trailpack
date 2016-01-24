'use strict'

const assert = require('assert')
const lib = require('../lib')
const _ = require('lodash')

describe('lib.util', () => {
  let appA, appB
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
    beforeEach(() => {
      appA = {
        api: {
          services: { },
          models: { },
          controllers: { },
          policies: { }
        }
      }
      appA = {
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
      const mergedApp = lib.Util.mergeApplication(app, pack)
      assert(_.isFunction(mergedApp.api.services.TestService))
    })

    it('should override extant Service class if there is naming conflict', () => {
      const mergedApp = lib.Util.mergeApplication(app, pack)
      assert(_.isFunction(mergedApp.api.services.OverrideService))
      assert(mergedApp.api.services.OverrideService.prototype.testMethodOverride)
      assert(!mergedApp.api.services.OverrideService.prototype.testMethod)
    })

  })
})

