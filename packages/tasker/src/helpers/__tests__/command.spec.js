const command = require('../command');

describe('command', () => {
  it('must return a function', () => {
    expect(command('ls')).toBeInstanceOf(Function);
  });

  // TODO: PROPERLY TEST SPAWN LOGIC
  // it('must execute the passed command', async () => {
  //   const cmd = command('ls');
  //   let output = '';
  //   let errOutput = '';

  //   process.stdout.on('data', (data) => {
  //     output += data;
  //   });

  //   process.stderr.on('data', (data) => {
  //     errOutput += data;
  //   });

  //   const commandFinish = Promise.all([
  //     new Promise((resolve) => process.stdout.on('end', resolve)),
  //     new Promise((resolve) => process.stderr.on('end', resolve))
  //   ]);

  //   cmd();

  //   await commandFinish;

  //   expect(errOutput).toBe('');
  //   expect(output).toContain('package.json');
  // });

  it('must fail the promise if there is a problem with the command', async () => {
    const cmd = command('wrong command');

    try {
      await cmd();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
