# trailpack

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Trailpack Interface. Trailpacks extend the functionality of the Trails
framework. (**Application functionality** should be extended using
[Microservices](https://github.com/trailsjs/trailpack-microservices)).

## Usage
This module is a class which should be extended by all trailpacks.

#### Implement

See [`archetype/index.js`](https://github.com/trailsjs/trailpack/blob/master/archetype/index.js)
for more details.
```js
const Trailpack = require('trailpack')

class HipsterMagic extends Trailpack {
  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

  // ...
}
```

#### Configure

See [`archetype/config/trailpack.js`](https://github.com/trailsjs/trailpack/blob/master/archetype/config/trailpack.js)
for more details.
```js
// config/trailpack.js
module.exports = {
  provides: {
    // ...
  },

  lifecycle: {
    // ...
  }
}

```

## Lifecycle

0. `app.start`
1. Validate
2. Configure
3. Initialize
4. `app.ready`

## API

#### `constructor(app, definition)`
Instantiate the Trailpack. `definition` is an object which contains three
optional properties: `config`, `api`, `pkg`. Trailpack configuration is merged
into the application configuration.

#### `validate()`
Validate the preconditions for proper functioning of this trailpack. For
example, if this trailpack requires that a database is configured in
`config/database.js`, this method should validate this. This method should incur
no side-effects. *Do not alter any extant configuration.*

#### `configure()`
Extend the configuration (`config/`, or `app.config`) of the application, or
add new configuration objects. This method is run before the application
has loaded. You can alter application configuration here.

#### `initialize()`
If you need to bind any event listeners, start servers, connect to databases,
all of that should be done in initialize. Here, all of the configuration is
loaded and finalized.

## Contributing
We love contributions! Please see our [Contribution Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md)
for more information.

## License
[MIT](https://github.com/trailsjs/trailpack/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

