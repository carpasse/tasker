#!/usr/bin/env node

const args = require('args');
const getConfig = require('../src/getConfig');
const run = require('../src/run');

const CONFIG_FILE = 'tasker.config.js';

args
  .option('config', `Path to the config file. If omitted it will search up for ${CONFIG_FILE} in the directory tree`, null, getConfig)
  .command('run', 'execs the specified task.', async (name, [task], options) => run(task, await options.config), ['r']);

// eslint-disable-next-line no-unused-vars
const flags = args.parse(process.argv, {
  name: 'tasker'
});

