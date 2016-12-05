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
  })
  describe('misc', () => {
    it('type property should be "misc"', () => {
      assert.equal(MiscTrailpack.type, 'misc')
    })
  })
  describe('server', () => {
    it('type property should be "server"', () => {
      assert.equal(ServerTrailpack.type, 'server')
    })
  })
  describe('system', () => {
    it('type property should be "system"', () => {
      assert.equal(SystemTrailpack.type, 'system')
    })
  })
  describe('tool', () => {
    it('type property should be "tool"', () => {
      assert.equal(ToolTrailpack.type, 'tool')
    })
  })
})
