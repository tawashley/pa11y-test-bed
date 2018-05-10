# pa11y test bed

> Test spike for pa11y command line setup.

## Setup

After cloning the repo...

* `npm i` to grab all dependencies
* `node run.js` to run pa11y

A custom reporter, `pa11y-reporter-grouped.js`, is used to group the same errors together in the console.

## Configuration

Setting what URLs are tested can be changed in `config.js` using the `urlList` array. 

pa11y configuration options can be set inside the `options` object (e.g. changing the standard).

[pa11y configuration options](https://github.com/pa11y/pa11y#configuration)
