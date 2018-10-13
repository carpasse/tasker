const chalk = require('chalk');
const spawn = require('./spawn');

const execute = (cmdText, options = {}) => {
  // eslint-disable-next-line no-console
  console.log('•••••••••••••••', options);

  const cmd = spawn(cmdText, options);

  return {
    cmd,
    name: cmdText,
    payload: new Promise((resolve, reject) => {
      const handleCmdError = (code) => {
        reject(new Error(`Command '${cmdText}' exited with code ${code}`));
      };
      let stdout = '';

      if (cmd.stdout) {
        cmd.stdout.on('data', (data) => {
          // eslint-disable-next-line no-console
          console.log(chalk`{bold.green \`${cmdText}\` stdout:} ${data}`);
          stdout += data;
        });

        cmd.stderr.on('data', (data) => {
          /* istanbul ignore next */
          // eslint-disable-next-line no-console
          console.error(chalk`{bold.yellow \`${cmdText}\` stderr:} ${data}`);
        });
      }
      cmd.on('error', handleCmdError);
      cmd.on('close', (code) => {
        if (code !== 0) {
          handleCmdError(code);

          return;
        }

        resolve(stdout);
      });
    })
  };
};
const command = (cmd) => (payload, options) => execute(cmd, options);

module.exports = command;
