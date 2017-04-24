const assert = require('assert')

describe('<%= packName %>', () => {
  let pack
  before(() => {
    pack = global.app.packs.<%= packBasename %>
    assert(pack)
  })
  describe('#validate', () => {
    it.skip('TODO test')
  })
  describe('#configure', () => {
    it.skip('TODO test')
  })
  describe('#initialize', () => {
    it.skip('TODO test')
  })
  describe('#unload', () => {
    it.skip('TODO test')
  })
})
