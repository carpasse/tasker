const {exec} = require('child_process');
const util = require('util');

const execute = util.promisify(exec);
const command = (cmd) => () => execute(cmd);

module.exports = command;
