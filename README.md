# trailpack

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Trailpack Interface. Trailpacks extend the functionality of the Trails
framework. (**Application functionality** should be extended using
[Microservices](https://github.com/trailsjs/trailpack-microservices)).

## Usage
This module is a class, which should be extended by all trailpacks.

```js
const Trailpack = require('trailpack')

class HipsterMagic extends Trailpack {
  constructor (app) {
    super(app, require('./config'), require('./api'))
  }

  // ...
}
```

## Lifecycle

0. `app.start`
1. Validate
2. Configure
3. Initialize
4. `app.ready`

## API

#### `validate()`
Validate the preconditions for proper functioning of this trailpack. For
example, if this trailpack requires that a database is configured in
`config/database.js`, this method should validate this. This method should incur
no side-effects. *Do not alter any extant configuration.*

#### `configure()`
Extend the configuration (`config/`, or `app.config`) of the application, or
add new configuration objects. This method is run before the application
has loaded.

#### `initialize()`
If you need to bind any event listeners, start servers, connect to databases,
all of that should be done in initialize. Here, all of the configuration is
loaded and finalized.

## Contributing
We love contributions! In order to be able to review your code efficiently,
please keep the following in mind:

1. Pull Requests (PRs) must include new and/or updated tests, and all tests [must pass](https://travis-ci.org/trailsjs/trailpack).
2. Use `eslint`! See the `eslintConfig` in [package.json](https://github.com/trailsjs/trailpack/blob/master/package.json).
3. Please [reference the relevant issue](https://github.com/blog/1506-closing-issues-via-pull-requests) in your Pull Request.

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
