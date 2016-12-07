'use strict'

const assert = require('assert')
const DatastoreTrailpack = require('../datastore')
const MiscTrailpack = require('../misc')
const ServerTrailpack = require('../server')
const SystemTrailpack = require('../system')
const ToolTrailpack = require('../tool')

describe('Trailpack Interfaces', () => {

  describe('datastore', () => {
    it('type property should be "datastore"', () => {
      assert.equal(DatastoreTrailpack.type, 'datastore')
    })
    it('will error if instantiated directly', () => {
      assert.throws(() => new DatastoreTrailpack(global.app), Error)
    })
  })
  describe('misc', () => {
    it('type property should be "misc"', () => {
      assert.equal(MiscTrailpack.type, 'misc')
    })
    it('will error if instantiated directly', () => {
      assert.throws(() => new MiscTrailpack(global.app), Error)
    })
  })
  describe('server', () => {
    it('type property should be "server"', () => {
      assert.equal(ServerTrailpack.type, 'server')
    })
    it('will error if instantiated directly', () => {
      assert.throws(() => new ServerTrailpack(global.app), Error)
    })
  })
  describe('system', () => {
    it('type property should be "system"', () => {
      assert.equal(SystemTrailpack.type, 'system')
    })
    it('will error if instantiated directly', () => {
      assert.throws(() => new SystemTrailpack(global.app), Error)
    })
  })
  describe('tool', () => {
    it('type property should be "tool"', () => {
      assert.equal(ToolTrailpack.type, 'tool')
    })
    it('will error if instantiated directly', () => {
      assert.throws(() => new ToolTrailpack(global.app), Error)
    })
  })
})
