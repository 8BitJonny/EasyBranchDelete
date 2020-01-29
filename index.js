const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
  const { stdout, stderr } = await exec('git branch');
  if (stderr) {	
    console.log("🔥 Exited because git branch errored with: \n🔥", stderr)
    return;
  }
  
  const branches = stdout.split(/[\n\s*]+/).map(el => el.trim()).filter(el => el !== '')
  
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "branchToDelete",
        message: "Select which branches to delete.",
        choices: branches
      }
    ])
    .then(answers => {
      answers.branchToDelete.forEach(branch => {
	exec(`git branch -d ${branch}`)
          .then(({ stderr, stdout }) => {
            if (stderr) console.log(`🔥 Couldn't delete branch because it thre error: \n${stderr}`);
            console.log(stdout);
          })
          .catch(console.err)
      })
    })
    .catch(err => console.error);
}
main();

