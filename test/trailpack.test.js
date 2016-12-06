'use strict'

const assert = require('assert')
const EventEmitter = require('events').EventEmitter
const smokesignals = require('smokesignals')
const TestPack = require('./pack')

describe('Trailpack', () => {
  let app
  beforeEach(() => {
    app = new EventEmitter()
    app.api = { }
    app.config = {
      log: {
        logger: new smokesignals.Logger('debug')
      }
    }
    app.pkg = {
      name: 'testapp'
    }
  })

  describe('#constructor', () => {
    it('should construct without error', () => {
      const pack = new TestPack(app)
      assert(pack)
    })
    it('should emit "constructed" event', done => {
      app.once('trailpack:testpack:constructed', done)
      new TestPack(app)
    })
    it('should merge default API interfaces into the app', () => {
      new TestPack(app)
      const DatastoreService = app.api.services.DatastoreService

      assert(DatastoreService)
      //assert.throws(DatastoreService.select, Error)
    })
  })

  describe('#name', () => {
    it('should return module name', () => {
      const pack = new TestPack(app)
      assert.equal(pack.name, 'testpack')
    })
  })

  describe('#log', () => {
    it('should work', () => {
      const pack = new TestPack(app)
      pack.log.debug('hello')
    })
  })
})

