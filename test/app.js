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
      packs: [
        require('./pack')
      ],
      paths: {
        root: __dirname
      }
    }
  },
  pkg: {}
}

module.exports = App
