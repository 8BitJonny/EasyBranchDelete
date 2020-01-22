const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
  const { stdout, stderr } = await exec('git branch');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
main();

