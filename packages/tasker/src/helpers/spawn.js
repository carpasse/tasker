/* eslint-disable filenames/match-exported */
const {spawn} = require('child_process');

const spawnCmd = (cmdText, options) => {
  const cmdLine = cmdText.replace(/\s+/g, ' ').trim();
  const [cmdName, ...params] = cmdLine.split(' ');

  return spawn(cmdName, params, options);
};

module.exports = spawnCmd;
