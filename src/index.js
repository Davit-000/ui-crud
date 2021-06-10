#!/usr/bin/env node
"use strict";
const program = require('commander');
const packageJson = require('../package.json');
program
    .version(packageJson.version)
    .description(packageJson.description);
program
    .command('make <name>')
    .alias('m')
    .description('generates components for crud operations.')
    // @ts-ignore
    .action((...args) => {
    console.log(args);
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map