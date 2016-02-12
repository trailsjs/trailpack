# <%= name %>

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

<%= description %>

## Install

```sh
$ npm install --save <%= name %>
```

## Configure

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('<%= name %>')
  ]
}
```

[npm-image]: https://img.shields.io/npm/v/<%= name %>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/<%= name %>
[ci-image]: https://img.shields.io/travis/<%= githubAccount %>/<%= name %>/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/<%= githubAccount %>/<%= name %>
[daviddm-image]: http://img.shields.io/david/<%= githubAccount %>/<%= name %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= githubAccount %>/<%= name %>
[codeclimate-image]: https://img.shields.io/codeclimate/github/<%= githubAccount %>/<%= name %>.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/<%= githubAccount %>/<%= name %>

