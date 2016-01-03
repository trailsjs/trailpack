'use strict'

const assert = require('assert')
const TrailsApp = require('trails')
const TestPack = require('./pack')
const smokesignals = require('smokesignals')

describe('Trailpack', () => {

  before(() => {
    global.app = new TrailsApp(require('./app'))
    return global.app.start().catch(global.app.stop)
  })

  after(() => {
    return global.app.stop()
  })

  describe('#constructor', () => {
    it('should construct without error', () => {
      const pack = new smokesignals.Trailpack(global.app)
      assert(pack)
    })
    it('should emit "constructed" event', done => {
      global.app.after('trailpack:testpack:constructed').then(() => done() )
      new TestPack(global.app)
    })
  })

  describe('#name', () => {
    it('should return module name', () => {
      const pack = new TestPack(global.app)
      assert.equal(pack.name, 'testpack')
    })
  })

  describe.skip('#expunge', () => {
    it('should release module from cache', () => {
      assert(require.cache)
      assert(require.cache[require.resolve('./pack')])

      // unload module!
      /*
      return pack.expunge(require.resolve('./pack'))
        .then(() => {
          assert.equal(require.cache[require.resolve('./pack')], undefined)
        })
        */
    })
  })
})
