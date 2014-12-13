Redwall
=======

[![Build Status](https://secure.travis-ci.org/herereadthis/redwall.svg?branch=master)](http://travis-ci.org/herereadthis/redwall)
[![devDependency Status](https://david-dm.org/herereadthis/redwall/dev-status.svg)](https://david-dm.org/herereadthis/redwall#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/herereadthis/redwall/badges/gpa.svg)](https://codeclimate.com/github/herereadthis/redwall)

Redwall is the codebase of the website, "Here, Read This" at [herereadthis.com](http://herereadthis.com), and is created by [Jimmy Ha](https://github.com/herereadthis). The homepage is a tribute to 90s web design, while additional pages feature coding projects and photographic works.

## Documentation

(Incomplete) [extended documentation](https://github.com/herereadthis/redwall/blob/master/docs/readme.md) is located in `docs` directory.

### Build

You will need NPM

```bash
$ brew install node
```

```bash
# 1-step build:
$ npm run all
```

```bash
# Alternative: detailed install
# install packages
$ npm install
# install Jekyll
$ gem install jekyll
# get bower dependencies
$ npm run bower
# run grunt automated tasks
$ npm run grunt
# browser will load URL at localhost:9000
$ npm run server
```

