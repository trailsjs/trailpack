const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  api: {},
  config: {
    env: {
      development: {
        mypack: {
          port: 8080,
          nested: {
            test3: 'test'
          },
          added: 'ok'
        }
      },
      testing: {
        mypack: {
          port: 8080,
          nested: {
            test3: 'test'
          },
          added: 'ok'
        }
      }
    },
    mypack: {
      port: 3000,
      nested: {
        test2: 'ok',
        nestedDeep: {
          test3: 'ko'
        }
      }
    },
    main: {
      packsConfig: {
        'trailpack-testpack': {
          lifecycle: {
            initialize: {
              emit: ['trailpack:testpack:custom']
            }
          }
        }
      },
      packs: [
        smokesignals.Trailpack,
        require('./pack')
      ],
      paths: {
        root: __dirname
      }
    }
  },
  pkg: {}

}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
