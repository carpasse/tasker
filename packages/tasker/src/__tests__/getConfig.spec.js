const getConfig = require('../getConfig');
const defaultConfig = require('../../../../tasker.config');
const sampleConfig = require('./sample.config');

describe('getConfig', () => {
  it('must be a function', () => {
    expect(getConfig).toBeInstanceOf(Function);
  });

  it('must throw if the passed config file doesn\'t exists', async () => {
    const configFile = './non-existing-config.js';

    try {
      await getConfig(configFile);
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
      expect(error.message).toBe(`Tasker Error: can't file config file '${configFile}'`);
    }
  });

  it('must return the passed config module', async () => {
    expect(await getConfig('./src/__tests__/sample.config.js')).toEqual(sampleConfig);
  });

  it('if config file is omitted, it must search up the default config file', async () => {
    expect(await getConfig()).toEqual(defaultConfig);
  });
});
