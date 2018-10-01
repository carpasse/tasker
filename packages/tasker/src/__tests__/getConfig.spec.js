const getConfig = require('../getConfig');

describe('getConfig', () => {
  it('must be a function', () => {
    expect(getConfig).toBeInstanceOf(Function);
  });
});
