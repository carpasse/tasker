const {ChildProcess} = require('child_process');
const command = require('../command');

describe('command', () => {
  it('must return a function', () => {
    expect(command('ls')).toBeInstanceOf(Function);
  });

  it('must resolve the promise if there is a problem with the command', async () => {
    const cmd = command('wrong command');

    try {
      await cmd().payload;
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Command \'wrong command\' exited with code Error: spawn wrong ENOENT');
    }
  });

  it('must return a payload with the stdout of the command', async () => {
    const ls = command('ls');
    const {
      cmd,
      name,
      payload
    } = ls();

    expect(cmd).toBeInstanceOf(ChildProcess);
    expect(name).toBe('ls');
    expect(await payload).toContain('package.json');
  });

  it('must be possible to configure the spawn', async () => {
    const ls = command('ls');
    const {
      cmd,
      name,
      payload
    } = ls(null, {stdio: 'inherit'});

    expect(cmd).toBeInstanceOf(ChildProcess);
    expect(name).toBe('ls');
    expect(await payload).toBe('');
  });
});
