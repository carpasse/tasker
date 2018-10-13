/* eslint-disable id-match */
const child_process = require('child_process');
const getTask = require('../getTask');
const mockTask = require('./mockTask');
const mock_task = require('./mock-task');

describe('getTask', () => {
  it('must return the passed function', () => {
    const task = () => {};

    expect(getTask(task)).toBe(task);
  });

  it('must return the module', () => {
    expect(getTask('src/__tests__/mockTask')).toBe(mockTask);
    expect(getTask('src/__tests__/mock')).toBe(mock_task);
    expect(getTask('child_process')).toBe(child_process);
  });

  it('must initialize array tuple task', () => {
    const opts = {foo: 'bar'};
    const initializedTask = () => {};
    const task = jest.fn();

    task.mockReturnValue(initializedTask);

    expect(getTask([task, opts])).toBe(initializedTask);
    expect(task).toHaveBeenCalledWith(opts);
  });

  it('if a task is a string but not a module it must assume it is a command', async () => {
    const task = getTask('ls');

    const {payload} = task({stdio: 'pipe'});

    expect(await payload).toContain('package.json');
  });

  it('must throw if the we pass an object', () => {
    expect(getTask).toThrow();
    expect(() => getTask({})).toThrow();
  });
});
