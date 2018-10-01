#!/usr/bin/env node

const args = require('args');
const getConfig = require('../src/getConfig');

const DEFAULT_CONFIG_PATH = './tasker.config.js';

args
  .option('config', `Path to the config file. Defaults to ${DEFAULT_CONFIG_PATH}`, DEFAULT_CONFIG_PATH, getConfig)
  .command('run', 'execs the specified task.', (name, sub, options) => {
    // eslint-disable-next-line no-console
    console.log(name, sub, options);
  }, ['r']);

// eslint-disable-next-line no-unused-vars
const flags = args.parse(process.argv, {
  name: 'tasker'
});

