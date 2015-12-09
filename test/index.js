'use strict'

const assert = require('assert')
const TestPack = require('./testpack')

describe('Trailpack', () => {
  let pack
  before(() => {
    pack = new TestPack()
  })

  describe('#name', () => {
    it('should return module name', () => {
      assert.equal(pack.name, 'testpack')
    })
  })

  describe('#unload', () => {
    it('should release module from cache', () => {
      assert(require.cache)
      assert(require.cache[require.resolve('./testpack')])
      pack.unload()
      assert.equal(require.cache[require.resolve('./testpack')], undefined)
    })
  })
})
