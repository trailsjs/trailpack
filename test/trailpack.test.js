'use strict'

const assert = require('assert')
const TestPack = require('./pack')
const smokesignals = require('smokesignals')

describe('Trailpack', () => {

  describe('#constructor', () => {
    it('should construct without error', () => {
      const pack = new smokesignals.Trailpack(global.app)
      assert(pack)
    })
    it('should emit "constructed" event', done => {
      global.app.after('trailpack:testpack:constructed').then(() => done())
      new TestPack(global.app)
    })
    it('should merge default API interfaces into the app', () => {
      const DatastoreService = global.app.services.DatastoreService

      assert(DatastoreService)
      assert.throws(DatastoreService.select, Error)
    })
  })

  describe('#name', () => {
    it('should return module name', () => {
      const pack = new TestPack(global.app)
      assert.equal(pack.name, 'testpack')
    })
  })

  describe('#log', () => {
    it('should work', () => {
      const pack = new TestPack(global.app)
      pack.log.debug('hello')
    })
  })
})

