const fs = require('fs');
const path = require('path');
const findUp = require('find-up');

const CONFIG_FILE_NAME = 'tasker.config.js';

const getConfig = async (configFile) => {
  const configPath = typeof configFile === 'string' ? path.resolve(configFile) : await findUp(CONFIG_FILE_NAME);

  if (!configPath || !fs.existsSync(configPath)) {
    throw new TypeError(`Tasker Error: can't file config file '${configFile}'`);
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  return require(configPath);
};

module.exports = getConfig;
