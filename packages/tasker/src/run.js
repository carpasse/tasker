const getTask = require('./getTask');

const run = (main_task, config, payload) => {
  const steps = config[main_task];

  if (!Array.isArray(steps)) {
    throw new TypeError(`Can't find a valid task named '${main_task}' in the config`);
  }

  return steps.reduce(async (prevPayload, nextStep) => {
    const data = await prevPayload;
    const newPayload = data && data.payload ? await data.payload : await data;

    if (config[nextStep]) {
      return run(nextStep, config, newPayload);
    }

    const task = getTask(nextStep);

    return task(newPayload);
  }, payload);
};

module.exports = run;
