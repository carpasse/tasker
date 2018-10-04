const path = require('path');
const isModule = require('../isModule');

describe('isModule', () => {
  it('must return true if the module is installed and false otherwise', () => {
    expect(isModule('path')).toBe(true);
    expect(isModule('jest')).toBe(true);
    expect(isModule(path.resolve('src/helpers/isModule'))).toBe(true);
    expect(isModule('foo')).toBe(false);
    expect(isModule('./foo')).toBe(false);
  });
});

