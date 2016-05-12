'use strict'

const assert = require('assert')
const lib = require('../../lib')
const _ = require('lodash')
const smokesignals = require('smokesignals')

describe('lib.util', () => {
  describe('#mergeApplication', () => {
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
        },
        models: { },
        controllers: { },
        policies: { }
      }
    }
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
        log: new smokesignals.Logger('error')
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
        log: new smokesignals.Logger('error')
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
  describe('#mergeApplicationConfig', () => {
    let mergedConfig
    const pack = {
      config: {
        sectionA: {
          arrayConfig: [ 1, 2, 3, 4, 5, 6 ],
          foo: 'topLevelPackSetting',
          subsection: {
            bar: 'nestedPackSetting',
            newSetting: 'newSetting'
          }
        },
        sectionB: {
          arrayConfig: [
            { a: 1 },
            { b: 2 }
          ]
        },
        sectionC: {
          arrayTypeConflict: { a: 1 }
        }
      }
    }
    beforeEach(() => {
      const appA = {
        log: new smokesignals.Logger('error'),
        config: {
          sectionA: {
            arrayConfig: [ 1, 2, 3 ],
            foo: 'topLevelAppSetting',
            subsection: {
              bar: 'nestedAppSetting',
              extantSetting: 'extantSetting'
            }
          },
          sectionB: {
            arrayConfig: [
              { a: 3 },
              { b: 4 }
            ]
          },
          sectionC: {
            arrayTypeConflict: [ 1, 2, 3 ]
          }
        }
      }
      mergedConfig = lib.Util.mergeApplicationConfig(appA, pack)
    })
    it('should non-destructively merge top-level configuration', () => {
      assert.equal(mergedConfig.sectionA.foo, 'topLevelAppSetting')
    })
    it('should non-destructively merge nested configuration', () => {
      assert.equal(mergedConfig.sectionA.subsection.bar, 'nestedAppSetting')
    })
    it('should not merge a non-array into an array', () => {
      assert.equal(mergedConfig.sectionC.arrayTypeConflict.length, 3)
      assert.equal(mergedConfig.sectionC.arrayTypeConflict[0], 1)
      assert.equal(mergedConfig.sectionC.arrayTypeConflict[1], 2)
      assert.equal(mergedConfig.sectionC.arrayTypeConflict[2], 3)
    })
    it('should merge new values into an app with no pre-existing value', () => {
      assert.equal(mergedConfig.sectionA.subsection.newSetting, 'newSetting')
    })
    it('should merge new object into an object with pre-existing values, and keep those values', () => {
      assert.equal(mergedConfig.sectionA.subsection.extantSetting, 'extantSetting')
    })
    it('should merge arrays with no duplicates for primitive values', () => {
      assert.equal(mergedConfig.sectionA.arrayConfig.length, 6)
    })
    it('should merge arrays with complex values', () => {
      assert.equal(mergedConfig.sectionB.arrayConfig.length, 4)
    })

  })
})

