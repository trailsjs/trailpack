'use strict'

const assert = require('assert')
const TestPack = require('./pack')

describe('Trailpack', () => {
  let pack
  before(() => {
    pack = new TestPack()
  })

  describe('#name', () => {
    it('should return module name', () => {
      assert.equal(pack.name, 'test')
    })
  })

  describe('#unload', () => {
    it('should release module from cache', () => {
      assert(require.cache)
      assert(require.cache[require.resolve('./pack')])

      // unload module!
      return pack.unload(require.resolve('./pack'))
        .then(() => {
          assert.equal(require.cache[require.resolve('./pack')], undefined)
        })
    })
  })
})
