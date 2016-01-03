const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  api: {

  },
  config: {
    main: {
      packs: [
      ],
      paths: {
        root: __dirname
      }
    }
  },
  pkg: {

  }

}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
