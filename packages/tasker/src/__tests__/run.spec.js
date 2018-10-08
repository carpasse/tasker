const run = require('../run');

const makeTask = (taskName) => (payload) => `${payload ? payload + '-' : ''}${taskName}`;

describe('run', () => {
  it('must throw if the main task is not found', () => {
    const mainTask = 'task';

    expect(() => {
      run(mainTask, {});
    }).toThrow(TypeError, `Can't find a valid task named '${mainTask}' in the config`);
  });

  it('must run all the steps in the main task passing the generated payload through the tasks', async () => {
    const mainTask = 'task';
    const config = {
      [mainTask]: [
        makeTask('task1'),
        makeTask('task2'),
        makeTask('task3')
      ]
    };

    expect(await run(mainTask, config)).toBe('task1-task2-task3');
  });

  it('must be fractal. I.E. a main task can be compose of other main tasks', async () => {
    const mainTask = 'task';
    const config = {
      [mainTask]: [
        'other',
        makeTask('task3')],
      other: [
        makeTask('task1'),
        makeTask('task2')
      ]
    };

    expect(await run(mainTask, config)).toBe('task1-task2-task3');
  });
});
