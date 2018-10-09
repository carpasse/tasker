const {spawn} = require('child_process');

const execute = (cmdText) => {
  const cmdLine = cmdText.replace(/\s+/g, ' ').trim();
  const [cmdName, ...params] = cmdLine.split(' ');

  return new Promise((resolve, reject) => {
    const cmd = spawn(cmdName, params || [], {stdio: 'inherit'});

    cmd.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Command ${cmdText} exited with code ${code}`));

        return;
      }

      resolve();
    });

    cmd.on('error', (code) => {
      if (code !== 0) {
        reject(new Error(`Command ${cmdText} exited with code ${code}`));

        return;
      }

      resolve();
    });
  });
};
const command = (cmd) => () => execute(cmd);

module.exports = command;
