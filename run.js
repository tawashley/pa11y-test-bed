#!/usr/bin/env node

'use strict';

const pa11y = require('pa11y');
const groupedReporter = require('./pa11y-reporter-grouped');
const {
    urlList,
    options
} = require('./config');

runPa11yTests();

async function runPa11yTests() {
    var tests = [];

    try {
        console.log('');
        console.log('Running pa11y on...')
        console.log('');
        console.log(urlList.join('\n'));

        urlList.forEach((url) => tests.push(pa11y(url, options)))

        const results = await Promise.all(tests);

        groupedReporter.output(results);
    } catch (error) {
        console.error(error.message);
    }
}
