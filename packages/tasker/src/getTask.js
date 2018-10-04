/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const isModule = require('./helpers/isModule');
const command = require('./helpers/command');

const resolveModule = (task) => path.resolve(process.cwd(), task);
const findModule = (task) => {
  if (isModule(task)) {
    return require(task);
  }

  if (isModule(resolveModule(task))) {
    return require(resolveModule(task));
  }

  if (isModule(resolveModule(`${task}-task`))) {
    return require(resolveModule(`${task}-task`));
  }

  return null;
};

const getTask = (task) => {
  if (Array.isArray(task)) {
    const [task_name, options] = task;

    return getTask(task_name)(options);
  }

  if (typeof task === 'function') {
    return task;
  }

  if (typeof task === 'string') {
    return findModule(task) || command(task);
  }

  throw new Error(`Task ${task} not found`);
};

module.exports = getTask;
