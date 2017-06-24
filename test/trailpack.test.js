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
      app.once('trailpack:testpack:constructed', pack => done())
      new TestPack(app)
    })
  })

  describe('#name', () => {
    it('should return module name', () => {
      const pack = new TestPack(app)
      assert.equal(pack.name, 'testpack')
    })
  })
})

