const command = require('../command');

describe('command', () => {
  it('must create a function that will execute the command', async () => {
    const cmd = command('ls');

    expect(cmd).toBeInstanceOf(Function);
    const {stdout, stderr} = await cmd();

    expect(stderr).toBe('');
    expect(stdout).toContain('package.json');
  });

  it('must fail the promise if there is a problem with the command', async () => {
    const cmd = command('wrong command');

    try {
      await cmd();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
