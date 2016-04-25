# trailpack

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Trailpack Interface. Trailpacks extend the capability of the Trails
framework. (**Application functionality** should be extended using
Services).

## Usage
This module is a class which should be extended by all trailpacks.

#### Implement

See [`archetype/index.js`](https://github.com/trailsjs/trailpack/blob/master/archetype/index.js)
for more details.

```js
const Trailpack = require('trailpack')

class ExampleTrailpack extends Trailpack {
  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

  validate () {
    if (!this.app.config.example) throw new Error('config.example not set!')
  }

  configure () {
    this.app.config.example.happy = true
  }

  initialize () {
    this.interval = setInterval(() => {
      this.log.debug('happy?', this.app.config.example.happy)
    }, 1000)
  }

  unload () {
    clearInterval(this.interval)
  }
}
```

#### Configure

See [`archetype/config/trailpack.js`](https://github.com/trailsjs/trailpack/blob/master/archetype/config/trailpack.js)
for more details.
```js
// config/trailpack.js
module.exports = {
  type: 'misc',
  lifecycle: {
    configure: [ ],
    initialize: [ ]
  }
}
```

## API

### Boot Lifecycle

0. [`trails:start`](https://github.com/trailsjs/trails/blob/master/index.js#L72) (event)
1. [`validate()`](https://github.com/trailsjs/trailpack/blob/master/index.js#L54-L61)
2. [`configure()`](https://github.com/trailsjs/trailpack/blob/master/index.js#L63-L70)
3. [`initialize()`](https://github.com/trailsjs/trailpack/blob/master/index.js#L72-L78)
4. [`trails:ready`](https://github.com/trailsjs/trails/blob/master/lib/trailpack.js#L38)

### Properties

#### `log`
Provides convenient access to the Trails logger. (e.g. `this.log.debug('hello')`)

#### `packs`
Access the application's loaded Trailpacks. This is a mapping of
name -> Trailpack. (e.g. `this.packs.core`)

#### `on`, `once`, `emit`, `after`
Emit/Listen for events on the Trails EventEmitter. Convenience methods for
`this.app.on`, `this.app.once`, etc. (e.g. `this.emit('custom:event')`)

### Methods

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
Alter/Extend the configuration (`app.config`) of the application, or
add new sections to the config object for the trailpack. This method 
is run before the application is loaded -- after validate, and before 
initialize. Trails does not allow further configuration changes after
this lifecycle stage is complete.

#### `initialize()`
If you need to bind any event listeners, start servers, connect to databases,
all of that should be done in initialize. The app's configuration is guaranteed to be
loaded and finalized before this stage.

#### `unload()`
Cleaup any resources/daemons started by this Trailpack. Used by [trailpack-autoreload](https://github.com/trailsjs/trailpack-autoreload)
and other system tools to cleanly release resources in order to
shutdown/restart the Trails application.

### Types
The trailpack `type` is used to distinguish between Trailpacks by the role they 
perform in the application. It is also used by developer tools such as [Trailmix](https://github.com/trailsjs/trailsmix)

#### `abstract`
An abstract trailpack is designed to provide an interface for a particular
kind of trailpack, and are not included directly.

#### `system`
These trailpacks provide critical framework-level functionality that most/all
other trailpacks will depend on, such as [`core`](https://github.com/trailsjs/trailpack-core)
and [`router`](https://github.com/trailsjs/trailpack-router).

#### `server`
These allow you to use various node.js web server frameworks with Trails, such
as [`express`](https://github.com/trailsjs/trailpack-express4),
[`hapi`](https://github.com/trailsjs/trailpack-hapi),
and [`koa`](https://github.com/trailsjs/trailpack-koa). Typically, only one
server pack will be installed in a Trails Application.

#### `datastore`
Datastore trailpacks provide a unified way to configure various persistence
stores. These may be ORMs, query builders, or database drives. Examples include
[`knex`](https://github.com/trailsjs/trailpack-knex), [`graphql`](https://github.com/trailsjs/trailpack-graphql)
and [`waterline`](https://github.com/trailsjs/trailpack-waterline). Typically,
only one datastore pack will be installed in a Trails Application.

#### `tools`
Every application needs a suite of tools for development, debugging,
monitoring, etc. These trailpacks integrate various modules with Trails
to provide a richer developer experience. Some tool packs include
[`autoreload`](https://github.com/trailsjs/trailpack-autoreload), [`webpack`](https://github.com/trailsjs/trailpack-webpack),
[`repl`](https://github.com/trailsjs/trailpack-repl). Trails Application logic
will typically not rely on these trailpacks directly.

#### `extensions`
Extension packs exist to augment, or extend, the functionality of other
trailpacks or existing framework logic.
For example, [`footprints`](https://github.com/trailsjs/trailpack-footprints)
provides a standard interface between `server` and `datastore` trailpacks.
[`realtime`](https://github.com/trailsjs/trailpack-realtime) adds additional
functionality to a server. [`sails`](https://github.com/trailsjs/trailpack-sails)
lets you plugin an entire sails project directly into a Trails Application.
[`bootstrap`](https://github.com/trailsjs/trailpack-bootstrap) extends the Trails
boot process so that a custom method can be run during application startup.

#### `misc`
All trailpacks that don't fit previous types.

## Contributing
We love contributions! Please see our [Contribution Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md)
for more information.

## License
[MIT](https://github.com/trailsjs/trailpack/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

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

