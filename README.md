# Platformer game (title pending)

[![Build Status](https://travis-ci.org/digijin/platformer.svg?branch=master)](https://travis-ci.org/digijin/platformer) [![Coverage Status](https://coveralls.io/repos/github/digijin/platformer/badge.svg?branch=master)](https://coveralls.io/github/digijin/platformer?branch=master) [![Code Climate](https://codeclimate.com/github/digijin/platformer.svg)](https://codeclimate.com/github/digijin/platformer) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/digijin/platformer/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/digijin/platformer/?branch=master) [![CircleCI](https://circleci.com/gh/digijin/platformer.svg?style=svg)](https://circleci.com/gh/digijin/platformer)

## latest release

http://platformer.digijin.com

## dev

```
npm run dev
```

## testing

### running tests

Karma watcher:

```
npm run karma
```

Karma single run:

```
npm run karma:ci
```

jest watcher:

```
npm run dev:unit
```

jest single run:

```
npm run test
```

### file conventions

files ending in `.test.js` are run only in Jest (for snapshots)
files ending in `.karma.js` are run only in Karma (for browser specifics)
files ending in `.spec.js` are run in both

if using vscode hit f5 with chrome debugger installed
