const {spawn} = require('child_process');
const chalk = require('chalk');

const execute = (cmdText, options = {}) => {
  const cmd = spawn(cmdText, {
    shell: true,
    ...options
  });

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
