const getTask = require('./getTask');

const runTask = (taskName, payload, options) => {
  if (options.config[taskName]) {
    // eslint-disable-next-line no-use-before-define
    return run(taskName, options, payload);
  }

  const task = getTask(taskName);

  return task(payload, options);
};

const run = (main_task, options, data) => {
  const {config, logLevel} = options;
  const steps = config[main_task];

  /* istanbul ignore if */
  if (!Array.isArray(steps)) {
    throw new TypeError(`Can't find a valid task named '${main_task}' in the config`);
  }

  return steps.reduce(async (payload, nextStep) => {
    /* istanbul ignore if */
    if (logLevel > 1) {
      // eslint-disable-next-line no-console
      console.log(`Starting \`${nextStep}\``);
    }

    const response = runTask(nextStep, await payload, options);
    const newPayload = await (response && response.payload ? response.payload : response);

    /* istanbul ignore if */
    if (logLevel > 1) {
      // eslint-disable-next-line no-console
      console.log(`\`${nextStep}\` finished`);
    }

    return newPayload;
  }, data);
};

module.exports = run;
