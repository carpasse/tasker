const tasker = require('../index');

describe('tasker', () => {
  it('must be a function', () => {
    expect(tasker).toBeInstanceOf(Function);
  });
});
